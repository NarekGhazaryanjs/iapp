#Requires -Version 5.1
<#
  FTP գաղտնաբառը GitHub-ը չի ցույց տալիս (անվտանգության համար) — այն պետք է hosting-ից վերցնես
  (support, reg.am հաճախորդի գոտի, հին email) ու մի անգամ մուտքագրես ստեղ։

  Օրինակ (PowerShell, repo-ի արմատից).
    .\scripts\gh-ftp-secrets.ps1

  Կամ առանց հարցերի (միայն եթե հարմար է քեզ համար).
    .\scripts\gh-ftp-secrets.ps1 -Password '...' -Server 'ftp.iapp.am' -User 'iappadmin@iapp.am'
#>
param(
    [string] $Server = "ftp.iapp.am",
    [string] $User = "iappadmin@iapp.am",
    [string] $Password = ""
)

$repo = "NarekGhazaryanjs/iapp"

if (-not $Password) {
    $secure = Read-Host "FTP password (GitHub Actions-ի համար)" -AsSecureString
    $bstr = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($secure)
    try {
        $Password = [Runtime.InteropServices.Marshal]::PtrToStringAuto($bstr)
    } finally {
        [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($bstr)
    }
}

if ([string]::IsNullOrWhiteSpace($Password)) {
    Write-Error "Password is empty."
    exit 1
}

gh auth status *> $null
if ($LASTEXITCODE -ne 0) {
    Write-Error "Run: gh auth login"
    exit 1
}

Write-Host "Setting GitHub Actions secrets for $repo ..."
gh secret set FTP_SERVER -b $Server -R $repo
gh secret set FTP_USERNAME -b $User -R $repo
gh secret set FTP_PASSWORD -b $Password -R $repo

Write-Host "Starting Deploy iapp to cPanel workflow ..."
gh workflow run deploy.yml -R $repo

Write-Host "Done. Open: https://github.com/$repo/actions (wait ~30s, check latest Deploy run)."

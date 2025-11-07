# Lumina Gate – PaLMs Gate (build/EF/DB snapshot)

This folder contains **scripts and helper utilities** used to run Lumina Gate checks locally or in CI/CD.

> I am not sure if we have ever actually made a PaLMs Gate anywhere. This `README.md` was created to complete a task, regardless if needed.

--- 

- Run locally:

```
  pwsh InCareSys.SelfHealth.Shared/wwwroot/docs/Architecture/Gates/tools/lumina-gate.ps1 `
    -SolutionPath "InCareSys.SelfHealth.sln" `
    -SharedProject "InCareSys.SelfHealth.Shared/InCareSys.SelfHealth.Shared.csproj" `
    -StartupProject "InCareSys.SelfHealth.Web/InCareSys.SelfHealth.Web.csproj" `
    -AppSettingsPath "InCareSys.SelfHealth.Web/appsettings.Development.json" `
    -Environment "Development" -SkipDbCheck
```

- Results write to:
  `InCareSys.SelfHealth.Shared/wwwroot/docs/Architecture/Gates/results/lumina-result.<timestamp>.json`

- Schema is enforced; connection strings are redacted with a stable fingerprint hash.
- Markdown fence issues are reported in `warnings[]` to catch UI rendering hazards early.


---

##### [incaresys.com](https://incaresys.com/) | [GitHub](https://github.com/TransR/InCareSys.SelfHealth) | [Email](mailto:marks@incaresys.com) | [Phone : 508-612-5021](phoneto:508-612-5021)

###### Copyright © 2025 — All Rights Reserved by Jason Silvestri

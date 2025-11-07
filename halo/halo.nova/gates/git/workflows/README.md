# Nova Gate – GitHub Action Workflow

This folder contains **scripts and helper utilities** used to run Nova Gate checks locally or in CI/CD.

---

## Notes
- These scripts are **not run automatically** unless explicitly invoked.  
- In CI/CD, the associated GitHub Action workflow (`InCareSys.SelfHealth/InCareSys.SelfHealth.Shared/wwwroot/docs/Architecture/Gates/git/workflows/nova-gate.yaml`) will call these scripts.  
- After testing and validation, we will place the file back in the Git Workflow Actions `InCareSys.SelfHealth\.github\workflows`
- Scripts should always write outputs to the `../results/` folder.  


##### [incaresys.com](https://incaresys.com/) | [GitHub](https://github.com/TransR/InCareSys.SelfHealth) | [Email](mailto:marks@incaresys.com) | [Phone : 508-612-5021](phoneto:508-612-5021)

###### Copyright © 2025 — All Rights Reserved by Jason Silvestri

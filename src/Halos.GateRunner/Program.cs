using System.Diagnostics;

var root = AppContext.BaseDirectory;

var repoRoot = Directory.GetParent(AppContext.BaseDirectory)!.Parent!.Parent!.Parent!.Parent!.FullName;
var gatesDir = Path.Combine(repoRoot, "gates");
var node = "node";

static int Run(string file, string args, string cwd)
{
    var p = new Process
    {
        StartInfo = new ProcessStartInfo
        {
            FileName = file,
            Arguments = args,
            WorkingDirectory = cwd,
            UseShellExecute = false,
            RedirectStandardOutput = true,
            RedirectStandardError = true
        }
    };
    p.OutputDataReceived += (_, e) => { if (e.Data is not null) Console.WriteLine(e.Data); };
    p.ErrorDataReceived += (_, e) => { if (e.Data is not null) Console.Error.WriteLine(e.Data); };
    p.Start();
    p.BeginOutputReadLine();
    p.BeginErrorReadLine();
    p.WaitForExit();
    return p.ExitCode;
}


int exit = 0;
exit |= Run(node, "tools/validate-gate.mjs --schema workflow --file ./samples/workitem.sample.item.json", gatesDir);
exit |= Run(node, "tools/validate-gate.mjs --schema workitem-list --file ./samples/workitem.sample.json", gatesDir);
exit |= Run(node, "tools/validate-gate.mjs --schema whatsnext --file ./samples/whatsnext.sample.json", gatesDir);

return exit;


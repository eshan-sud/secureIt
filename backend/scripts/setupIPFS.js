const { exec, spawn } = require("child_process");
const fs = require("fs");
const path = require("path");
const os = require("os");

const USERPROFILE = process.env.USERPROFILE || os.homedir();
const ipfsDir = path.join(USERPROFILE, "ipfs");
const ipfsClusterDir = path.join(USERPROFILE, "ipfs-cluster");

const goIpfsUrl =
  "https://dist.ipfs.io/go-ipfs/v0.20.0/go-ipfs_v0.20.0_windows-amd64.zip";
const ipfsClusterUrl =
  "https://dist.ipfs.io/ipfs-cluster-service/v0.16.2/ipfs-cluster-service_v0.16.2_windows-amd64.zip";

function runCommand(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { shell: true, ...options });
    child.stdout.on("data", (data) => {
      process.stdout.write(data);
    });
    child.stderr.on("data", (data) => {
      process.stderr.write(data);
    });
    child.on("close", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`Command failed: ${command} ${args.join(" ")}`));
    });
  });
}

async function fileExists(filePath) {
  return fs.promises
    .access(filePath, fs.constants.F_OK)
    .then(() => true)
    .catch(() => false);
}

async function installGoIpfs() {
  console.log("Installing go-ipfs...");

  // Download zip
  const zipPath = path.join(USERPROFILE, "Downloads", "go-ipfs.zip");
  if (!(await fileExists(zipPath))) {
    await runCommand("powershell", [
      `Invoke-WebRequest -Uri '${goIpfsUrl}' -OutFile "${zipPath}"`,
    ]);
  }

  // Unzip
  if (!(await fileExists(path.join(ipfsDir, "go-ipfs")))) {
    await runCommand("powershell", [
      `Expand-Archive -Path ${zipPath} -DestinationPath ${ipfsDir}`,
    ]);
  }

  // Run install.ps1 (powershell script included in go-ipfs folder)
  await runCommand("powershell", [
    `& '${path.join(ipfsDir, "go-ipfs", "install.ps1")}'`,
  ]);

  // Initialize IPFS repo
  const ipfsExe = path.join(USERPROFILE, "go-ipfs", "ipfs.exe");
  if (!(await fileExists(path.join(USERPROFILE, ".ipfs", "config")))) {
    await runCommand(ipfsExe, ["init"]);
  }

  // Start IPFS daemon in background
  console.log("Starting IPFS daemon...");
  spawn(ipfsExe, ["daemon"], { detached: true, stdio: "ignore" }).unref();
}

async function installIpfsCluster() {
  console.log("Installing IPFS Cluster Service...");

  // Download cluster zip
  const zipPath = path.join(
    USERPROFILE,
    "Downloads",
    "ipfs-cluster-service.zip"
  );
  if (!(await fileExists(zipPath))) {
    await runCommand("powershell", [
      `Invoke-WebRequest -Uri '${ipfsClusterUrl}' -OutFile "${zipPath}"`,
    ]);
  }

  // Unzip
  if (!(await fileExists(ipfsClusterDir))) {
    await runCommand("powershell", [
      `Expand-Archive -Path ${zipPath} -DestinationPath ${ipfsClusterDir}`,
    ]);
  }

  const clusterExe = path.join(ipfsClusterDir, "ipfs-cluster-service.exe");

  // Initialize cluster if not already initialized
  if (
    !(await fileExists(path.join(USERPROFILE, ".ipfs-cluster", "service.json")))
  ) {
    await runCommand(clusterExe, ["init"]);
  }

  // Start cluster daemon in background
  console.log("Starting IPFS Cluster daemon...");
  spawn(clusterExe, ["daemon"], { detached: true, stdio: "ignore" }).unref();
}

async function main() {
  try {
    const ipfsExe = path.join(USERPROFILE, "go-ipfs", "ipfs.exe");
    const clusterExe = path.join(ipfsClusterDir, "ipfs-cluster-service.exe");

    const ipfsInstalled = await fileExists(ipfsExe);
    if (!ipfsInstalled) {
      await installGoIpfs();
    } else {
      console.log("go-ipfs already installed");
    }

    const clusterInstalled = await fileExists(clusterExe);
    if (!clusterInstalled) {
      await installIpfsCluster();
    } else {
      console.log("ipfs-cluster-service already installed");
    }
  } catch (error) {
    console.error("Error during installation:", error);
  }
}

module.exports = main;

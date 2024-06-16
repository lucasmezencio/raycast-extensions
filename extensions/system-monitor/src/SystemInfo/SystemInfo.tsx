import { Icon, List } from "@raycast/api";
import { usePromise } from "@raycast/utils";
import os from "node:os";

import { Actions } from "@SystemMonitor/components/Actions";
import { calculateDiskStorage, getGpuInfo, getOSInfo, getSerialNumber } from "@SystemMonitor/SystemInfo/SystemUtils";

export default function SystemInfo() {
  return (
    <List.Item
      id="info-panel"
      title="System Info"
      icon={Icon.Finder}
      detail={<SystemInfoDetail />}
      actions={<Actions />}
    />
  );
}

function SystemInfoDetail() {
  const { data, isLoading } = usePromise(async () => {
    const gpuInfo = await getGpuInfo();
    const osInfo = await getOSInfo();
    const serialNumber = await getSerialNumber();
    const storage = await calculateDiskStorage();

    return {
      gpuInfo,
      osInfo,
      serialNumber,
      storage,
    };
  });

  return (
    <List.Item.Detail
      isLoading={isLoading}
      metadata={
        <List.Item.Detail.Metadata>
          <List.Item.Detail.Metadata.Label title="Hardware Specifications" />
          <List.Item.Detail.Metadata.Label title="Hostname" text={os.hostname().replace(/\.(local|lan)/g, "")} />
          <List.Item.Detail.Metadata.Label title="Chip" text={os.cpus()[0].model} />
          <List.Item.Detail.Metadata.Label title="GPU" text={data?.gpuInfo ?? "-"} />
          <List.Item.Detail.Metadata.Label title="Serial Number" text={data?.serialNumber || "-"} />
          <List.Item.Detail.Metadata.Label
            title="macOS"
            text={data ? `${data?.osInfo.codename} ${data?.osInfo.release}` : "-"}
          />
          <List.Item.Detail.Metadata.Separator />
          <List.Item.Detail.Metadata.Label title="Storage" />
          {data?.storage.map((disk, index) => {
            return (
              <List.Item.Detail.Metadata.Label
                key={index}
                title={disk.diskName}
                text={`${disk.totalAvailableStorage} GB available of ${disk.totalSize} GB`}
              />
            );
          })}
        </List.Item.Detail.Metadata>
      }
    />
  );
}

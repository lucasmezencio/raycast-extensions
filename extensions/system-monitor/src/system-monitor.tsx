import { List, getPreferenceValues } from "@raycast/api";
import CpuMonitor from "@SystemMonitor/Cpu/CpuMonitor";
import MemoryMonitor from "@SystemMonitor/Memory/MemoryMonitor";
import NetworkMonitor from "@SystemMonitor/Network/NetworkMonitor";
import PowerMonitor from "@SystemMonitor/Power/PowerMonitor";
import SystemInfo from "@SystemMonitor/SystemInfo/SystemInfo";

const defaultView = getPreferenceValues<ExtensionPreferences>().defaultView;

export default function SystemMonitor() {
  return (
    <List isShowingDetail selectedItemId={defaultView}>
      <SystemInfo />
      <CpuMonitor />
      <MemoryMonitor />
      <PowerMonitor />
      <NetworkMonitor />
    </List>
  );
}

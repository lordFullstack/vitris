import { TopBar } from "@/components/shell/TopBar";
import { SavedListView } from "@/components/saved/SavedListView";
import { ShareButton } from "@/components/ui/ShareButton";

export default function LoQuieroPage() {
  return (
    <>
      <TopBar title="Lo quiero" actions={<ShareButton title="Mi lista Lo quiero" />} />
      <SavedListView />
    </>
  );
}

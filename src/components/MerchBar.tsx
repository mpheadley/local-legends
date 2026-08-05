import ContextualMerchGrid from "@/components/ContextualMerchGrid";
import StickerStrip from "@/components/StickerStrip";

export default function MerchBar() {
  return (
    <>
      <StickerStrip />
      <div style={{ background: "#12100c", borderTop: "1px solid rgba(154,108,47,0.14)", padding: "1.75rem 1.25rem" }}>
        <div style={{ maxWidth: "64rem", margin: "0 auto" }}>
          <ContextualMerchGrid ctx={{ limit: 4 }} heading="From the Southern Legends shop" layout="row" />
        </div>
      </div>
    </>
  );
}

import { redirect } from "next/navigation";

/**
 * The Portuguese case study that used to live here is superseded by the
 * engineering section. Kept as a redirect so existing links — including the
 * one printed on earlier resume PDFs — still land on the current version.
 */
export default function LegacyErpPage() {
  redirect("/engineering/erp");
}

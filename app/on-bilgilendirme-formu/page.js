import { createLegalPage } from "@/lib/legal/page";

const { Page, generateMetadata } = createLegalPage("on-bilgilendirme-formu");
export { generateMetadata };
export default Page;

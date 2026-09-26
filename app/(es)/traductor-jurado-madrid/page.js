// app/(es)/traductor-jurado-madrid/page.js
// Landing de ciudad generada desde content/ciudades.js con app/components/CityPage.js.
import CityPage, { cityMetadata } from "../../components/CityPage";
import { getCiudadBySlug } from "../../../content/ciudades";

const ciudad = getCiudadBySlug("traductor-jurado-madrid");

export const metadata = cityMetadata(ciudad);

export default function Page() {
  return <CityPage ciudad={ciudad} />;
}

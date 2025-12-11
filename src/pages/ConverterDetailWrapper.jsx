import { useParams } from "react-router-dom";
import ConverterDetail from "./ConverterDetail.jsx";

export default function ConverterDetailWrapper() {
  const { id } = useParams();
  return <ConverterDetail key={id} />;
}

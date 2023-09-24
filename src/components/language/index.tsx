import { FaGolang, FaJava } from "react-icons/fa6";

export default function Language({ name }: { name: string }) {
  switch (name) {
    case "GO":
      return <FaGolang size={30} />;
    case "JAVA":
      return <FaJava size={30} />;
    default:
      null;
  }
}

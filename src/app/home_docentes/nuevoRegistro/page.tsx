import Image from "next/image";
import FormularioNuevoRegistro from "@/components/home_docentes/formularioNuevoRegistro";

export default function nuevoRegistro() {
    return (
        <div className="flex flex-col items-center justify-start min-h-screen ">
            <div className="w-full">
                <Image
                    src="/img/desarrollo.png"
                    alt="Banner"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="w-full h-auto object-cover"
                />
            </div>

            <section>
                <div>
                    <FormularioNuevoRegistro />
                </div>
            </section>
            
        </div>
    );
}
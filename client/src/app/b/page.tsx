import Link from "next/link";

export default function B() {
  return (
    <div className="flex flex-col gap-8 justify-center items-center w-full h-full">
      <div className="flex flex-col gap-4 justify-center items-center">
        <h1>
          Simular chat de <strong>Tarefa</strong>
        </h1>
        <div className="flex flex-col gap-2">
          <Link href="/b/room/1" passHref>
            <button type="button" className="btn btn-outline btn-primary">
              TAREFA 1
            </button>
          </Link>

          <Link href="/b/room/2" passHref>
            <button type="button" className="btn btn-outline btn-primary">
              TAREFA 2
            </button>
          </Link>

          <Link href="/b/room/3" passHref>
            <button type="button" className="btn btn-outline btn-primary">
              TAREFA 3
            </button>
          </Link>
        </div>
      </div>
      <hr className="w-full" />
      <div className="flex flex-col gap-4 justify-center items-center">
        <h1>
          Simular chat de <strong>Whatsapp</strong>
        </h1>
        <div className="flex flex-col gap-2">
          <Link href="/b/room/guest" passHref>
            <button type="button" className="btn btn-outline btn-primary">
              ENTRAR COMO USUÁRIO CONVIDADO
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

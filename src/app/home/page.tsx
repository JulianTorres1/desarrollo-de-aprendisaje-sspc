import { getServerSession } from "next-auth";
import { authOptions } from "src/app/api/auth/[...nextauth]/route";
import React from "react";

// componente de la página de inicio

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <p>Acceso denegado</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Bienvenido(a) a la página de inicio</h1>
      <p className="mt-4 text-gray-600">Aquí puedes ver información general sobre la aplicación.</p>
      <div className="mt-6">
        <p>Nombre: {session.user.name}</p>
        <p>Email: {session.user.email}</p>
        <p>Rol: {session.user.role}</p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident repudiandae tenetur
          illo voluptatum esse distinctio, praesentium odit culpa quae qui autem voluptates saepe
          totam quo tempora unde accusamus cumque expedita? Provident blanditiis delectus tenetur
          possimus dolores sed obcaecati iste molestias aliquam. Odit tempora nemo quaerat
          reiciendis vero necessitatibus quia doloribus, modi inventore animi mollitia ipsam
          exercitationem, praesentium delectus asperiores omnis ab? Ducimus quos similique iure
          debitis, odit voluptates distinctio velit? Maxime blanditiis amet ipsum, dolorem eaque
          praesentium esse ad. Velit eos consequuntur repellendus veritatis perspiciatis explicabo
          sunt aliquam. Cum, dolore sunt! Repudiandae, nam quae tempore aperiam vero aliquid maxime
          reprehenderit eos sequi dignissimos illum saepe optio maiores cumque qui voluptate
          deserunt reiciendis dolores est enim nesciunt magni neque fugit. Eaque aperiam
          consectetur, maxime dolores facilis debitis doloremque id odio suscipit sequi a dolorem,
          eveniet obcaecati rem voluptatibus libero saepe eius numquam modi. Dignissimos ipsam
          assumenda, ducimus voluptatum deleniti, iste necessitatibus distinctio ad doloremque
          accusantium repudiandae laboriosam ut vitae natus similique quia quisquam corporis modi,
          at nisi reprehenderit nemo voluptate est. Atque quod, maiores, ex aliquam corrupti impedit
          animi laudantium illo voluptas vel unde recusandae debitis voluptatum voluptate, eligendi
          dolor a sequi accusantium distinctio voluptatem. Aut voluptate mollitia vitae? Architecto
          exercitationem debitis modi iste dolores numquam provident eveniet nam temporibus
          cupiditate ipsum similique quasi vitae voluptate tempore ad totam quod sed, magni officia
          molestiae aspernatur libero! Praesentium quam laboriosam porro cupiditate corporis! Et
          ducimus quaerat natus! Repellat veritatis cum qui eligendi voluptate dolorem a ratione
          perspiciatis tenetur, consequuntur, explicabo voluptas facere inventore repudiandae non
          quod at totam! Necessitatibus odit commodi quo quod modi? Aperiam alias eius magni facilis
          ab tenetur iusto quo in incidunt nesciunt! Saepe iusto quo magni vero itaque quis dolorem,
          fugit consequuntur deserunt perferendis, esse non? Eius architecto laborum accusantium
          animi aperiam suscipit labore vel. Distinctio soluta consectetur omnis deleniti explicabo
          aspernatur consequuntur sed nihil, molestias optio facere autem nostrum. Sapiente
          accusamus vero assumenda ipsum alias repellat odit, neque repellendus illum obcaecati
          quidem iusto eveniet sint earum. Laudantium eum accusantium, cupiditate soluta quidem
          iusto ipsa deserunt ex et quis quos mollitia esse consequuntur, aperiam id nobis
          reprehenderit odio voluptatum totam libero doloremque quaerat cumque odit expedita! Illo
          vero magnam explicabo! Ullam rem vel earum, unde itaque, enim harum alias sapiente
          voluptatibus pariatur atque nesciunt culpa laboriosam repudiandae? Officia eos ad beatae!
          Dolore expedita amet odio ipsa iusto minus dolorum voluptate veritatis soluta esse aliquam
          provident quo eius impedit corrupti illo corporis, ad nihil cumque distinctio facere
          officia, porro fuga laborum. Aperiam perspiciatis, molestiae tempora magnam quis sequi
          inventore hic nam odit atque eligendi placeat nihil ullam nobis illum sint possimus minus
          similique, quae accusamus nisi ratione sed ad voluptatibus! Nesciunt illo est, rem non
          fugiat eveniet recusandae voluptatem praesentium labore veritatis necessitatibus deleniti
          delectus neque inventore voluptate blanditiis dicta et possimus facere, natus libero
          reprehenderit voluptates debitis. Repudiandae aspernatur molestias voluptate quibusdam,
          doloremque ut dolor eos, in non illum corrupti commodi? Ipsam magnam cumque, laboriosam
          dignissimos aut assumenda et optio voluptatibus tenetur quas? Officiis illum quibusdam sed
          facere quis? Animi aperiam fugit dolorem, incidunt neque perferendis itaque odit, dolor
          doloremque temporibus totam iure odio ex pariatur? Iusto eos voluptatibus eveniet odit
          provident doloremque velit explicabo, nihil quia enim. Voluptatum, dolor. Debitis
          asperiores nam facere, nemo veritatis doloremque autem soluta quia recusandae vel,
          distinctio saepe maxime? Velit, nulla, quam, unde voluptatibus at consectetur officia sed
          accusantium alias iusto atque distinctio incidunt? Error vero iusto ullam praesentium
          laudantium modi sint. Quo, repudiandae optio! Porro excepturi, voluptatum dolores maxime
          optio quae molestiae doloribus nam magnam a saepe, cumque reiciendis quaerat iusto
          eveniet. Autem, dolores non! Vel sunt id quibusdam iusto, adipisci error nemo voluptatum
          odio rem ad reprehenderit fugit dolore libero nobis ipsam iste quia distinctio nesciunt.
          Reprehenderit ab voluptate repellendus aperiam nisi temporibus natus adipisci praesentium
          nesciunt sapiente assumenda, nemo non eveniet tenetur a cum nobis fuga, placeat minima
          voluptatum! Nobis sequi neque, placeat velit veniam dolores! Ea libero esse ratione,
          facilis ex illum aperiam suscipit rem cumque dolores ut quos praesentium provident maiores
          cum, aut, vero fuga. Non possimus esse dolor itaque at aperiam sequi blanditiis laboriosam
          sit a impedit totam quibusdam voluptates et quidem autem recusandae maiores, minus sint.
          Excepturi minus dolore eum consequatur dolor delectus ipsam nesciunt animi officia rem!
          Nobis labore, veritatis possimus incidunt consequuntur assumenda quas saepe earum, ullam
          perspiciatis non facilis doloribus itaque, repudiandae animi quo voluptatum error fugiat
          voluptas? Possimus explicabo incidunt aut, eum corporis omnis animi officia quos
          consectetur doloremque, maiores odio sint, voluptatibus adipisci! Accusamus, itaque
          voluptatum earum quae consectetur temporibus natus voluptas, aut autem accusantium totam
          asperiores explicabo id. Ipsa a dignissimos porro totam tempore alias rerum voluptates vel
          doloremque autem, vitae deleniti eius numquam dolor excepturi reiciendis consequuntur
          quaerat obcaecati incidunt, nesciunt nostrum repudiandae sequi. Nisi dolorem amet qui
          minus ipsum, eius quod repellat magni facere blanditiis deleniti doloribus. Ipsam illum
          perferendis corporis iure neque, tempore voluptatem dolores. Necessitatibus sit amet eius
          nam eaque reprehenderit velit obcaecati, impedit voluptate aut officiis quae rem ea unde
          beatae expedita nisi quidem, ipsam hic vel eum optio consectetur aliquid quia. Labore,
          maxime aut minus aliquam quibusdam repellat magni velit exercitationem corrupti quos non
          magnam vitae quia distinctio inventore facilis recusandae eligendi veniam sunt, odit
          molestiae eveniet reprehenderit. Provident, quaerat pariatur? Consequatur voluptatibus
          delectus minima eius veritatis, quis voluptate magni esse repudiandae iusto quasi vero
          dignissimos deleniti quia laborum excepturi sit tempora laudantium veniam id fugit
          laboriosam? Officiis repellendus qui saepe, at eaque rem dolorem veniam aut magnam ducimus
          cupiditate fugiat adipisci iusto tempore esse. Ipsa, sint officiis. Placeat vero molestias
          sed soluta porro neque, non aut recusandae corrupti eaque dicta aliquid accusamus iusto,
          tempore consectetur aspernatur earum eligendi commodi! Minus, ipsam tempore dignissimos
          laborum cum quo, ratione dicta voluptates, eligendi facere quas quia animi quibusdam
          maiores ducimus. Quaerat harum necessitatibus veniam, quas quam libero voluptatum et velit
          est voluptatem eum ut consequatur laborum ipsa facere in tempore nobis illo aliquam autem
          corporis doloremque id neque! Ea et voluptatum harum adipisci veniam! Fuga illo
          consequuntur, dolorem velit natus doloremque. At impedit officia mollitia.
        </p>
      </div>
    </div>
  );
}

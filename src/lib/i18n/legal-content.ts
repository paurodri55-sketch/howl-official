import type { Locale } from "./config";

const SITE_URL = "https://howlofficial.com";
const OWNER_PLACEHOLDER = "[NOMBRE O RAZÓN SOCIAL DEL TITULAR]";
const TAX_ID_PLACEHOLDER = "[NIF/CIF]";
const ADDRESS_PLACEHOLDER = "[DIRECCIÓN FISCAL]";
const EMAIL_PLACEHOLDER = "[EMAIL DE CONTACTO]";

const OWNER_PLACEHOLDER_EN = "[LEGAL OWNER NAME / BUSINESS NAME]";
const TAX_ID_PLACEHOLDER_EN = "[TAX ID]";
const ADDRESS_PLACEHOLDER_EN = "[REGISTERED ADDRESS]";
const EMAIL_PLACEHOLDER_EN = "[CONTACT EMAIL]";

export const legalContent = {
  es: {
    aviso: {
      title: "Aviso Legal",
      updated: "Última actualización: agosto de 2026",
      sections: [
        {
          heading: "1. Titular del sitio",
          body: [
            `En cumplimiento del deber de información recogido en la Ley 34/2002, de Servicios de la Sociedad de la Información y Comercio Electrónico (LSSI-CE), se informa de que el titular de este sitio web (${SITE_URL}) es:`,
            `${OWNER_PLACEHOLDER} — NIF/CIF: ${TAX_ID_PLACEHOLDER} — Domicilio: ${ADDRESS_PLACEHOLDER} — Email de contacto: ${EMAIL_PLACEHOLDER}.`,
            "Nota: estos datos son un marcador de posición pendiente de completar por el titular real del negocio antes de operar comercialmente.",
          ],
        },
        {
          heading: "2. Objeto",
          body: [
            "Este sitio web tiene por objeto la venta online de ropa y accesorios de diseño propio bajo la marca HOWL. El acceso y uso del sitio atribuye la condición de usuario e implica la aceptación de este aviso legal.",
          ],
        },
        {
          heading: "3. Propiedad intelectual",
          body: [
            "Los diseños, textos, imágenes, logotipos y demás contenidos de este sitio son propiedad de HOWL o de sus licenciantes, y están protegidos por la normativa de propiedad intelectual e industrial. Queda prohibida su reproducción total o parcial sin autorización expresa.",
            "Las marcas, bandas y colecciones referenciadas con fines estéticos/narrativos son ficticias y no guardan afiliación con marcas, grupos musicales o artistas reales.",
          ],
        },
        {
          heading: "4. Responsabilidad",
          body: [
            "El titular no garantiza la disponibilidad continua del sitio ni se responsabiliza de daños derivados de la falta de disponibilidad o de errores en los contenidos, sin perjuicio de las medidas razonables que se adopten para evitarlos.",
          ],
        },
        {
          heading: "5. Legislación aplicable",
          body: [
            "Este aviso legal se rige por la legislación española. Para cualquier controversia derivada del acceso o uso del sitio, las partes se someten a los juzgados y tribunales que correspondan conforme a la normativa de consumidores aplicable.",
          ],
        },
      ],
    },
    privacidad: {
      title: "Política de Privacidad",
      updated: "Última actualización: agosto de 2026",
      sections: [
        {
          heading: "1. Responsable del tratamiento",
          body: [
            `${OWNER_PLACEHOLDER}, con NIF/CIF ${TAX_ID_PLACEHOLDER} y domicilio en ${ADDRESS_PLACEHOLDER}, es el responsable del tratamiento de los datos personales recabados a través de ${SITE_URL}. Contacto: ${EMAIL_PLACEHOLDER}.`,
          ],
        },
        {
          heading: "2. Qué datos tratamos y con qué finalidad",
          body: [
            "Boletín de noticias (newsletter): tratamos tu email para enviarte avisos sobre el lanzamiento y nuevas tiradas. Base legal: tu consentimiento, otorgado al enviar el formulario. Puedes darte de baja en cualquier momento.",
            "Pedidos y checkout: si realizas un pedido, tratamos los datos necesarios para gestionarlo (nombre, dirección, email). Base legal: ejecución del contrato de compraventa. Actualmente el checkout es una simulación de demostración; cuando se conecte una pasarela de pago real, esta política se actualizará con el detalle de esa integración.",
            "Carrito de compra: los artículos que añades al carrito se guardan localmente en tu navegador (localStorage), no en nuestros servidores, y no implican tratamiento de datos personales por nuestra parte.",
          ],
        },
        {
          heading: "3. Con quién compartimos tus datos",
          body: [
            "Los emails del boletín se almacenan en infraestructura de Vercel (KV/Upstash Redis) como encargado del tratamiento. No vendemos ni cedemos tus datos a terceros con fines comerciales.",
            "Cuando se active el envío físico de pedidos, será necesario compartir datos de envío con el proveedor de producción/logística (Printful u equivalente) únicamente para ese fin.",
          ],
        },
        {
          heading: "4. Plazo de conservación",
          body: [
            "Los emails del boletín se conservan hasta que solicites la baja. Los datos de pedidos se conservan durante el plazo legal exigido para obligaciones fiscales y de garantía.",
          ],
        },
        {
          heading: "5. Tus derechos",
          body: [
            `Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad escribiendo a ${EMAIL_PLACEHOLDER}. También puedes reclamar ante la Agencia Española de Protección de Datos (aepd.es) si consideras que no hemos atendido tu solicitud correctamente.`,
          ],
        },
      ],
    },
    cookies: {
      title: "Política de Cookies",
      updated: "Última actualización: agosto de 2026",
      sections: [
        {
          heading: "1. Qué usamos actualmente",
          body: [
            "Este sitio usa una cookie técnica llamada \"locale\" para recordar en qué idioma (español/inglés) quieres ver la web. Es estrictamente necesaria para el funcionamiento del selector de idioma y no requiere tu consentimiento previo según la normativa de cookies.",
            "También usamos almacenamiento local del navegador (localStorage, no es técnicamente una cookie pero se trata con el mismo criterio) para guardar el contenido de tu carrito de compra y para recordar si ya viste el aviso emergente de newsletter. Ambos son estrictamente funcionales.",
            "Además, usamos Vercel Analytics para saber cuántas visitas recibe el sitio y qué páginas se ven más. No usa cookies ni identifica a personas concretas — los datos son agregados y anónimos, por lo que no requiere tu consentimiento previo.",
          ],
        },
        {
          heading: "2. Lo que NO usamos (todavía)",
          body: [
            "Actualmente no utilizamos cookies de publicidad ni de redes sociales, ni herramientas de analítica que identifiquen a usuarios individuales (como Google Analytics con cookies). Si en el futuro se incorpora alguna herramienta de este tipo, se solicitará tu consentimiento explícito mediante un banner antes de activarlas, y esta política se actualizará en consecuencia.",
          ],
        },
        {
          heading: "3. Cómo gestionar las cookies",
          body: [
            "Puedes eliminar o bloquear las cookies desde la configuración de tu navegador en cualquier momento. Ten en cuenta que bloquear la cookie de idioma puede hacer que la web vuelva a mostrarse en el idioma por defecto en cada visita.",
          ],
        },
      ],
    },
  },
  en: {
    aviso: {
      title: "Legal Notice",
      updated: "Last updated: August 2026",
      sections: [
        {
          heading: "1. Site owner",
          body: [
            `In compliance with Spanish Law 34/2002 on Information Society Services (LSSI-CE), the owner of this website (${SITE_URL}) is:`,
            `${OWNER_PLACEHOLDER_EN} — Tax ID: ${TAX_ID_PLACEHOLDER_EN} — Address: ${ADDRESS_PLACEHOLDER_EN} — Contact email: ${EMAIL_PLACEHOLDER_EN}.`,
            "Note: these fields are placeholders pending completion by the actual business owner before commercial operation.",
          ],
        },
        {
          heading: "2. Purpose",
          body: [
            "This website's purpose is the online sale of original-design clothing and accessories under the HOWL brand. Accessing and using the site grants user status and implies acceptance of this legal notice.",
          ],
        },
        {
          heading: "3. Intellectual property",
          body: [
            "Designs, text, images, logos and other content on this site are the property of HOWL or its licensors, protected under intellectual and industrial property law. Reproduction, in whole or in part, without express authorization is prohibited.",
            "Brands, bands and collections referenced for aesthetic/narrative purposes are fictional and have no affiliation with any real brand, band or artist.",
          ],
        },
        {
          heading: "4. Liability",
          body: [
            "The owner does not guarantee continuous availability of the site and is not liable for damages arising from unavailability or content errors, without prejudice to reasonable measures taken to prevent them.",
          ],
        },
        {
          heading: "5. Governing law",
          body: [
            "This legal notice is governed by Spanish law. Any dispute arising from access to or use of the site will be subject to the competent courts under applicable consumer protection regulations.",
          ],
        },
      ],
    },
    privacidad: {
      title: "Privacy Policy",
      updated: "Last updated: August 2026",
      sections: [
        {
          heading: "1. Data controller",
          body: [
            `${OWNER_PLACEHOLDER_EN}, Tax ID ${TAX_ID_PLACEHOLDER_EN}, registered at ${ADDRESS_PLACEHOLDER_EN}, is the controller of personal data collected through ${SITE_URL}. Contact: ${EMAIL_PLACEHOLDER_EN}.`,
          ],
        },
        {
          heading: "2. What data we process and why",
          body: [
            "Newsletter: we process your email to notify you about the launch and new drops. Legal basis: your consent, given when submitting the form. You can unsubscribe at any time.",
            "Orders and checkout: if you place an order, we process the data needed to fulfill it (name, address, email). Legal basis: performance of the sales contract. Checkout is currently a local demo simulation; once a real payment gateway is connected, this policy will be updated with the details of that integration.",
            "Shopping cart: items added to your cart are stored locally in your browser (localStorage), not on our servers, and do not involve personal data processing on our part.",
          ],
        },
        {
          heading: "3. Who we share your data with",
          body: [
            "Newsletter emails are stored on Vercel infrastructure (KV/Upstash Redis) as data processor. We do not sell or share your data with third parties for commercial purposes.",
            "Once physical order fulfillment is enabled, shipping data will need to be shared with the production/logistics provider (Printful or equivalent) solely for that purpose.",
          ],
        },
        {
          heading: "4. Retention period",
          body: [
            "Newsletter emails are kept until you unsubscribe. Order data is kept for the legally required period for tax and warranty obligations.",
          ],
        },
        {
          heading: "5. Your rights",
          body: [
            `You can exercise your rights of access, rectification, erasure, objection, restriction and portability by writing to ${EMAIL_PLACEHOLDER_EN}. You may also file a complaint with the Spanish Data Protection Agency (aepd.es) if you believe your request was not properly handled.`,
          ],
        },
      ],
    },
    cookies: {
      title: "Cookie Policy",
      updated: "Last updated: August 2026",
      sections: [
        {
          heading: "1. What we currently use",
          body: [
            "This site uses a technical cookie called \"locale\" to remember which language (Spanish/English) you want to view the site in. It's strictly necessary for the language switcher to work and doesn't require prior consent under cookie regulations.",
            "We also use browser local storage (localStorage — not technically a cookie, but treated the same way) to save your shopping cart contents and to remember whether you've already seen the newsletter popup. Both are strictly functional.",
            "We also use Vercel Analytics to see how many visits the site gets and which pages are viewed most. It doesn't use cookies or identify specific individuals — the data is aggregated and anonymous, so it doesn't require your prior consent.",
          ],
        },
        {
          heading: "2. What we do NOT use (yet)",
          body: [
            "We currently don't use advertising or social media cookies, or analytics tools that identify individual users (like Google Analytics with cookies). If any such tool is added in the future, we will request your explicit consent via a banner before activating it, and this policy will be updated accordingly.",
          ],
        },
        {
          heading: "3. Managing cookies",
          body: [
            "You can delete or block cookies at any time from your browser settings. Note that blocking the locale cookie may cause the site to revert to the default language on each visit.",
          ],
        },
      ],
    },
  },
} as const;

export function getLegalContent(locale: Locale) {
  return legalContent[locale];
}

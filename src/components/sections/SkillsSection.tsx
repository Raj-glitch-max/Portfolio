/* eslint-disable */
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useState, useRef } from 'react';

// Tech stack icons as SVG components
export const TechIcons: Record<string, React.FC<{ className?: string }>> = {
    // Cloud & Infrastructure
    'AWS': ({ className }) => (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <path d="M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576.04.063.056.127.056.183 0 .08-.048.16-.152.24l-.503.335a.383.383 0 0 1-.208.072c-.08 0-.16-.04-.239-.112a2.47 2.47 0 0 1-.287-.375 6.18 6.18 0 0 1-.248-.471c-.622.734-1.405 1.101-2.347 1.101-.67 0-1.205-.191-1.596-.574-.391-.384-.59-.894-.59-1.533 0-.678.239-1.23.726-1.644.487-.415 1.133-.623 1.955-.623.272 0 .551.024.846.064.296.04.6.104.918.176v-.583c0-.607-.127-1.03-.375-1.277-.255-.248-.686-.367-1.3-.367-.28 0-.568.031-.863.103-.295.072-.583.16-.862.272a2.287 2.287 0 0 1-.28.104.488.488 0 0 1-.127.023c-.112 0-.168-.08-.168-.247v-.391c0-.128.016-.224.056-.28a.597.597 0 0 1 .224-.167c.279-.144.614-.264 1.005-.36a4.84 4.84 0 0 1 1.246-.151c.95 0 1.644.216 2.091.647.439.43.662 1.085.662 1.963v2.586zm-3.24 1.214c.263 0 .534-.048.822-.144.287-.096.543-.271.758-.51.128-.152.224-.32.272-.512.047-.191.08-.423.08-.694v-.335a6.66 6.66 0 0 0-.735-.136 6.02 6.02 0 0 0-.75-.048c-.535 0-.926.104-1.19.32-.263.215-.39.518-.39.917 0 .375.095.655.295.846.191.2.47.296.838.296zm6.41.862c-.144 0-.24-.024-.304-.08-.064-.048-.12-.16-.168-.311L7.586 5.55a1.398 1.398 0 0 1-.072-.32c0-.128.064-.2.191-.2h.783c.151 0 .255.025.31.08.065.048.113.16.16.312l1.342 5.284 1.245-5.284c.04-.16.088-.264.151-.312a.549.549 0 0 1 .32-.08h.638c.152 0 .256.025.32.08.063.048.12.16.151.312l1.261 5.348 1.381-5.348c.048-.16.104-.264.16-.312a.52.52 0 0 1 .311-.08h.743c.127 0 .2.065.2.2 0 .04-.009.08-.017.128a1.137 1.137 0 0 1-.056.2l-1.923 6.17c-.048.16-.104.263-.168.311a.51.51 0 0 1-.303.08h-.687c-.151 0-.255-.024-.32-.08-.063-.056-.119-.16-.15-.32l-1.238-5.148-1.23 5.14c-.04.16-.087.264-.15.32-.065.056-.177.08-.32.08zm10.256.215c-.415 0-.83-.048-1.229-.143-.399-.096-.71-.2-.918-.32-.128-.071-.215-.151-.247-.223a.563.563 0 0 1-.048-.224v-.407c0-.167.064-.247.183-.247.048 0 .096.008.144.024.048.016.12.048.2.08.271.12.566.215.878.279.319.064.63.096.95.096.502 0 .894-.088 1.165-.264a.86.86 0 0 0 .415-.758.777.777 0 0 0-.215-.559c-.144-.151-.416-.287-.807-.415l-1.157-.36c-.583-.183-1.014-.454-1.277-.813a1.902 1.902 0 0 1-.4-1.158c0-.335.073-.63.216-.886.144-.255.335-.479.575-.654.24-.184.51-.32.83-.415.32-.096.655-.136 1.006-.136.176 0 .359.008.535.032.183.024.35.056.518.088.16.04.312.08.455.127.144.048.256.096.336.144a.69.69 0 0 1 .24.2.43.43 0 0 1 .071.263v.375c0 .168-.064.256-.184.256a.83.83 0 0 1-.303-.096 3.652 3.652 0 0 0-1.532-.311c-.455 0-.815.071-1.062.223-.248.152-.375.383-.375.71 0 .224.08.416.24.567.159.152.454.304.877.44l1.134.358c.574.184.99.44 1.237.767.247.327.367.702.367 1.117 0 .343-.072.655-.207.926-.144.272-.336.511-.583.703-.248.2-.543.343-.886.447-.36.111-.743.167-1.142.167z" />
        </svg>
    ),
    'Terraform': ({ className }) => (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <path d="M1.44 0v7.575l6.561 3.79V3.789zm7.59 4.227v7.578l6.558 3.787V8.015zM22.56 8.015v7.577l-6.558-3.787V4.227zM9.03 12.74v7.575l6.558 3.788v-7.578z" />
        </svg>
    ),
    'Linux': ({ className }) => (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489a.424.424 0 0 0-.11.135c-.26.268-.45.6-.663.839-.199.199-.485.267-.797.4-.313.136-.658.269-.864.68-.09.189-.136.394-.132.602 0 .199.027.4.055.536.058.399.116.728.04.97-.249.68-.28 1.145-.106 1.484.174.334.535.47.94.601.81.2 1.91.135 2.774.6.926.466 1.866.67 2.616.47.526-.116.97-.464 1.208-.946.587.006 1.22-.057 1.926-.306a.99.99 0 0 0 .135-.069c.077 0 2.264.045 3.439-.377.86-.31 1.255-.854 1.349-1.447 1.041-.09 1.907-.553 2.319-1.166.317-.489.374-1.082.166-1.73-.249-.73-.612-1.167-.998-1.508-.413-.359-.832-.6-1.136-.949-.305-.351-.474-.641-.558-.902-.093-.303-.133-.573-.207-.879-.077-.33-.174-.621-.27-.913-.266-.751-.603-1.339-.968-1.863-.366-.524-.763-.983-1.052-1.471-.289-.489-.523-1.007-.697-1.571a7.21 7.21 0 0 1-.27-1.2c-.033-.298-.021-.58.01-.832.031-.252.096-.478.145-.597C13.96.951 13.228 0 12.504 0z" />
        </svg>
    ),
    'Docker': ({ className }) => (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <path d="M13.983 11.078h2.119a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186h-2.119a.185.185 0 0 0-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 0 0 .186-.186V3.574a.186.186 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.888c0 .102.082.185.185.186m0 2.716h2.118a.187.187 0 0 0 .186-.186V6.29a.186.186 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 0 0 .184-.186V6.29a.185.185 0 0 0-.185-.185H8.1a.185.185 0 0 0-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 0 0 .185-.186V6.29a.185.185 0 0 0-.185-.185H5.136a.186.186 0 0 0-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186h-2.118a.185.185 0 0 0-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 0 0 .184-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.185.185 0 0 0-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 0 0 .185-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.186.186 0 0 0-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 0 0 .184-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.185.185 0 0 0-.184.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 0 0-.75.748 11.376 11.376 0 0 0 .692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 0 0 3.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288z" />
        </svg>
    ),
    'Kubernetes': ({ className }) => (
        <img src="/kubernetes.png" alt="Kubernetes" className={className} style={{ objectFit: 'contain' }} />
    ),
    'GitHub': ({ className }) => (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
        </svg>
    ),
    'PostgreSQL': ({ className }) => (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.56 14.9c-.17-.62-.74-1-1.63-1.04-.88-.04-1.95.16-3.03.52.14-.44.24-.86.29-1.28a8.24 8.24 0 0 0-.53-4.12c-.55-1.34-1.5-2.48-2.7-3.3a7.72 7.72 0 0 0-3.76-1.4c-.63-.07-1.25-.07-1.85.02a6.12 6.12 0 0 0-2.87-1.2 5.93 5.93 0 0 0-3.51.67c-1.25.68-2.14 1.82-2.6 3.17a8.62 8.62 0 0 0-.29 4.12 11.46 11.46 0 0 0 1.04 3.36c.48.96 1.08 1.74 1.7 2.2a2.8 2.8 0 0 0 1.4.55c.17.47.58.95 1.25 1.35.8.47 1.93.76 3.17.71.3-.01.6-.04.89-.1.02.3.04.6.09.9.12.7.34 1.46.7 1.94.36.5.85.74 1.45.74.24 0 .5-.04.77-.14.84-.3 1.56-.96 2-1.83a8.72 8.72 0 0 0 .78-3.02c.81-.2 1.58-.52 2.23-.95.73-.48 1.33-1.1 1.7-1.86.24-.47.36-.97.36-1.5a2.6 2.6 0 0 0-.05-.51z" />
        </svg>
    ),
    'Redis': ({ className }) => (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <path d="M10.5 2.661l.54.997-1.797.644 2.409.218.748 1.246.467-1.155 2.209-.218-1.653-.61.604-1.123-1.856.726zm-6.04 3.373l8.836 3.693L24 6.034l-8.836-3.694zM0 17.965l8.836 3.694 10.736-4.493L8.836 13.47zm0-5.965l8.836 3.694 10.736-4.493-10.736-4.486z" />
        </svg>
    ),
    'MongoDB': ({ className }) => (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0111.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296.604-.463.85-.693a11.342 11.342 0 003.639-8.464c.015-.846-.054-1.696-.197-2.218z" />
        </svg>
    ),
    'Python': ({ className }) => (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01H8.51l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V11.03h6.67l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04zm-7.09 1.98l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z" />
        </svg>
    ),
    'Java': ({ className }) => (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <path d="M8.851 18.56s-.917.534.653.714c1.902.218 2.874.187 4.969-.211 0 0 .552.346 1.321.646-4.699 2.013-10.633-.118-6.943-1.149M8.276 15.933s-1.028.761.542.924c2.032.209 3.636.227 6.413-.308 0 0 .384.389.987.602-5.679 1.661-12.007.13-7.942-1.218M13.116 11.475c1.158 1.333-.304 2.533-.304 2.533s2.939-1.518 1.589-3.418c-1.261-1.772-2.228-2.652 3.007-5.688 0-.001-8.216 2.051-4.292 6.573M19.33 20.504s.679.559-.747.991c-2.712.822-11.288 1.069-13.669.033-.856-.373.75-.89 1.254-.998.527-.114.828-.093.828-.093-.953-.671-6.156 1.317-2.643 1.887 9.58 1.553 17.462-.7 14.977-1.82M9.292 13.21s-4.362 1.036-1.544 1.412c1.189.159 3.561.123 5.77-.062 1.806-.152 3.618-.477 3.618-.477s-.637.272-1.098.587c-4.429 1.165-12.986.623-10.522-.568 2.082-1.006 3.776-.892 3.776-.892M17.116 17.584c4.503-2.34 2.421-4.589.968-4.285-.355.074-.515.138-.515.138s.132-.207.385-.297c2.875-1.011 5.086 2.981-.928 4.562 0-.001.07-.062.09-.118M14.401 0s2.494 2.494-2.365 6.33c-3.896 3.077-.888 4.832-.001 6.836-2.274-2.053-3.943-3.858-2.824-5.539 1.644-2.469 6.197-3.665 5.19-7.627M9.734 23.924c4.322.277 10.959-.154 11.116-2.198 0 0-.302.775-3.572 1.391-3.688.694-8.239.613-10.937.168 0-.001.553.457 3.393.639" />
        </svg>
    ),
    'Helm': ({ className }) => (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.431 0a12.074 12.074 0 0 0-3.492.556c.092.107.15.238.188.376.062.22.07.454.063.683a5.167 5.167 0 0 1-.172 1.183c-.07.255-.162.503-.278.74a3.628 3.628 0 0 0 .18-.098c.188-.11.37-.229.545-.355.35-.253.678-.53.995-.82.312-.284.618-.584.968-.82.35-.237.757-.413 1.17-.374.414.039.792.255 1.03.58.238.327.355.734.39 1.137.038.405-.006.812-.052 1.216-.094.81-.228 1.618-.304 2.43a15.13 15.13 0 0 0-.038 2.196c.026.36.08.721.217 1.054.136.334.369.64.694.812.327.173.73.198 1.067.058.338-.14.6-.412.805-.712.204-.301.36-.632.5-.968.14-.337.267-.681.41-1.016a6.3 6.3 0 0 1 .498-.968 2.32 2.32 0 0 1 .746-.717c.3-.18.664-.263 1.011-.206.347.057.665.243.894.51.23.268.371.603.445.947.074.344.083.698.067 1.05-.033.702-.178 1.393-.36 2.068a13.327 13.327 0 0 1-.66 1.918c-.25.598-.54 1.18-.855 1.744a13.9 13.9 0 0 1-1.06 1.627c-.392.504-.817.986-1.284 1.424a8.548 8.548 0 0 1-1.517 1.112c-.55.316-1.14.568-1.755.745a7.792 7.792 0 0 1-1.883.297 7.756 7.756 0 0 1-1.883-.177 8.238 8.238 0 0 1-1.78-.603 9.127 9.127 0 0 1-1.59-.966c-.497-.38-.957-.805-1.377-1.263a11.566 11.566 0 0 1-1.126-1.464c-.336-.529-.637-1.08-.916-1.645-.279-.565-.538-1.142-.79-1.722-.252-.58-.5-1.165-.772-1.738-.136-.287-.28-.57-.44-.843-.16-.274-.338-.54-.546-.776a2.5 2.5 0 0 0-.73-.574c-.282-.15-.607-.23-.93-.194-.322.035-.624.175-.864.381-.241.206-.418.474-.545.765-.127.29-.21.602-.265.918-.055.317-.086.639-.1.962-.03.646.004 1.293.068 1.937.065.644.16 1.285.273 1.923.226 1.277.527 2.54.84 3.799.155.628.316 1.256.456 1.889.14.632.258 1.271.295 1.916a5.5 5.5 0 0 1-.036 1.003c-.037.327-.11.65-.238.949-.129.298-.316.573-.56.783-.246.21-.55.353-.872.396-.322.044-.655-.011-.946-.148-.29-.136-.535-.35-.723-.606a2.697 2.697 0 0 1-.39-.898c-.144-.628-.178-1.28-.204-1.927-.026-.647-.046-1.295-.1-1.94-.053-.644-.14-1.286-.273-1.919a9.81 9.81 0 0 0-.489-1.84 5.64 5.64 0 0 0-.395-.855 2.63 2.63 0 0 0-.275-.392l-.022-.025A12 12 0 1 0 12.43 0z" />
        </svg>
    ),
    'Jenkins': ({ className }) => (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <path d="M5.609 19.562c.206.127.43.304.664.312.404.014.5-.38.754-.57 1.244-.937 2.972-1.678 4.634-1.88 1.56-.19 2.684.094 3.917.475.45.139.896.301 1.336.479-.172-.391-.478-.812-.652-1.118-.312-.544-.48-.947-.577-1.57-.055-.347.078-.707.125-1.06.055-.416-.173-.742-.344-1.038-.303-.524-.73-.987-.913-1.594-.1-.33-.173-.68-.158-1.026.019-.417.17-.806.162-1.227-.01-.487-.25-.9-.51-1.286-.266-.393-.59-.784-.617-1.276-.01-.186.025-.367-.017-.547-.055-.234-.222-.33-.413-.352-.296-.037-.632.058-.916-.01-.427-.1-.807-.41-.977-.833-.12-.303-.274-.62-.312-.939-.153-1.246.73-2.274 1.927-2.526.45-.094.92-.102 1.386-.116 1.52-.044 3.055-.052 4.572.048.906.06 1.815.134 2.703.325A10.035 10.035 0 0 0 12 2C6.477 2 2 6.477 2 12c0 2.794 1.145 5.32 2.991 7.135.244-.198.543-.368.618-.573M23.9 10.665c-.136-1.253-.47-2.49-1.028-3.62l-.084.125c-.143.208-.436.16-.686.165-.41.008-.798.195-1.058.505-.225.268-.27.659-.3 1.003-.03.35-.07.763-.306 1.033-.28.322-.87.453-.993.892-.08.286.001.593.01.888.012.373-.013.797-.23 1.108-.204.293-.54.464-.847.614-.252.124-.517.238-.715.432-.162.16-.265.377-.378.575-.09.156-.19.315-.223.498-.037.206.023.413.082.61.2.675.414 1.302.43 2.019.016.687-.11 1.421.099 2.086.122.392.325.76.566 1.086A9.953 9.953 0 0 0 22 12c0-.454-.033-.9-.1-1.335" />
        </svg>
    ),
    'Bash': ({ className }) => (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <path d="M21.038 4.9c-.265-.903-.792-1.705-1.476-2.388a6.354 6.354 0 0 0-2.388-1.476A6.38 6.38 0 0 0 14.4.81c-.903 0-1.766.192-2.567.553a6.354 6.354 0 0 0-2.09 1.458L2.586 10.04a2.043 2.043 0 0 0-.601 1.458 2.04 2.04 0 0 0 .601 1.458l7.157 7.157c.386.386.892.601 1.458.601a2.04 2.04 0 0 0 1.458-.601l7.218-7.218c.662-.662 1.21-1.497 1.476-2.401.265-.903.265-1.87 0-2.773a6.353 6.353 0 0 0-1.476-2.388 6.354 6.354 0 0 0-2.388-1.476 6.38 6.38 0 0 0-2.773-.227c.903.265 1.705.792 2.388 1.476.684.684 1.21 1.497 1.476 2.401.265.903.265 1.87 0 2.773-.265.903-.792 1.705-1.476 2.388l-7.218 7.218a2.04 2.04 0 0 1-1.458.601 2.043 2.043 0 0 1-1.458-.601L.3 13.11a2.043 2.043 0 0 1-.601-1.458c0-.553.215-1.072.601-1.458L7.458 2.98c.662-.662 1.497-1.21 2.401-1.476.903-.265 1.87-.265 2.773 0 .903.265 1.705.792 2.388 1.476.684.684 1.21 1.497 1.476 2.401a6.38 6.38 0 0 1 .227 2.773c-.265-.903-.792-1.705-1.476-2.388-.684-.684-1.497-1.21-2.401-1.476a6.38 6.38 0 0 0-2.773-.227c-.903.265-1.705.792-2.388 1.476a6.354 6.354 0 0 0-1.476 2.388 6.38 6.38 0 0 0-.227 2.773c.265.903.792 1.705 1.476 2.388a6.354 6.354 0 0 0 2.388 1.476 6.38 6.38 0 0 0 2.773.227c.903-.265 1.705-.792 2.388-1.476a6.354 6.354 0 0 0 1.476-2.388 6.38 6.38 0 0 0 .227-2.773z" />
        </svg>
    ),
    'Git': ({ className }) => (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.6-.401-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187" />
        </svg>
    ),
    'YAML': ({ className }) => (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <path d="M3.2 0C1.433 0 0 1.433 0 3.2v17.6C0 22.567 1.433 24 3.2 24h17.6c1.767 0 3.2-1.433 3.2-3.2V3.2C24 1.433 22.567 0 20.8 0zm.9 5h2.1l1.8 3.6L9.8 5h2.1l-2.85 5.4V15H7V10.4zm8.35 0h2.1v4.35L17.1 5h2.1l-3.6 6.3V15h-2V11.3z" />
        </svg>
    ),
    'DynamoDB': ({ className }) => (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <path d="M16.606 4.016c-.238-.396-.762-.604-1.404-.604h-.004c-1.298 0-2.91.858-4.106 2.14-1.063 1.138-1.736 2.496-1.806 3.792-.02.352.022.684.114.994a2.762 2.762 0 0 0-.726.942c-.178.378-.266.79-.248 1.196.056 1.22.92 2.102 2.066 2.406v4.792l2.018-.538v-3.954c.476.04.966-.006 1.44-.146 1.488-.438 2.612-1.696 3.026-3.382.286-1.164.19-2.34-.266-3.216a3.314 3.314 0 0 0-.456-.65c.462-.864.576-1.826.356-2.772" />
        </svg>
    ),
    'Azure': ({ className }) => (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <path d="M4.1 4h7.1v7.1H4.1V4zm0 8.8h7.1v7.1H4.1v-7.1zm8.8-8.8h7.1v7.1h-7.1V4zm0 8.8h7.1v7.1h-7.1v-7.1z" />
        </svg>
    ),
    'GCP': ({ className }) => (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
        </svg>
    ),
    'React': ({ className }) => (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="12" r="2.5" />
            <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="currentColor" strokeWidth="1.5" transform="rotate(60 12 12)" />
            <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="currentColor" strokeWidth="1.5" transform="rotate(120 12 12)" />
        </svg>
    ),
    'NodeJS': ({ className }) => (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l9 5v10l-9 5-9-5V7l9-5zm0 2.2L5.3 8v8l6.7 3.8 6.7-3.8V8L12 4.2z" />
        </svg>
    ),
    'ArgoCD': ({ className }) => (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0L2 6v12l10 6 10-6V6L12 0zm0 3.3l6.5 3.8L12 10.9l-6.5-3.8L12 3.3zM4.5 8.3L11 12v7.9l-6.5-3.9V8.3zm15 0v7.7l-6.5 3.9V12l6.5-3.7z" />
        </svg>
    ),
    'Security': ({ className }) => (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 4l5 2.18V11c0 3.75-2.11 7.06-5 8.67-2.89-1.61-5-4.92-5-8.67V7.18L12 5z" />
        </svg>
    ),
    'Default': ({ className }) => (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
    ),
};

// Map skill names to icons
const getIconForSkill = (skillName: string): React.FC<{ className?: string }> => {
    const lowerName = skillName.toLowerCase();
    if (lowerName.includes('aws')) return TechIcons['AWS'];
    if (lowerName.includes('terraform')) return TechIcons['Terraform'];
    if (lowerName.includes('linux')) return TechIcons['Linux'];
    if (lowerName.includes('docker') && !lowerName.includes('compose')) return TechIcons['Docker'];
    if (lowerName.includes('kubernetes') || lowerName.includes('k8s')) return TechIcons['Kubernetes'];
    if (lowerName.includes('github')) return TechIcons['GitHub'];
    if (lowerName.includes('postgresql') || lowerName.includes('postgres')) return TechIcons['PostgreSQL'];
    if (lowerName.includes('redis')) return TechIcons['Redis'];
    if (lowerName.includes('mongo')) return TechIcons['MongoDB'];
    if (lowerName.includes('python')) return TechIcons['Python'];
    if (lowerName.includes('java') && !lowerName.includes('javascript')) return TechIcons['Java'];
    if (lowerName.includes('helm')) return TechIcons['Helm'];
    if (lowerName.includes('jenkins')) return TechIcons['Jenkins'];
    if (lowerName.includes('bash') || lowerName.includes('shell')) return TechIcons['Bash'];
    if (lowerName.includes('git') && !lowerName.includes('github')) return TechIcons['Git'];
    if (lowerName.includes('yaml')) return TechIcons['YAML'];
    if (lowerName.includes('dynamodb')) return TechIcons['DynamoDB'];
    if (lowerName.includes('azure')) return TechIcons['Azure'];
    if (lowerName.includes('gcp') || lowerName.includes('google')) return TechIcons['GCP'];
    if (lowerName.includes('react') || lowerName.includes('next')) return TechIcons['React'];
    if (lowerName.includes('node') || lowerName.includes('express')) return TechIcons['NodeJS'];
    if (lowerName.includes('argo') || lowerName.includes('gitops')) return TechIcons['ArgoCD'];
    if (lowerName.includes('security') || lowerName.includes('tfsec') || lowerName.includes('checkov') || lowerName.includes('zero-trust')) return TechIcons['Security'];
    if (lowerName.includes('rabbitmq')) return TechIcons['Default']; // Will use RabbitMQ icon from TechIcon
    if (lowerName.includes('jaeger')) return TechIcons['Default']; // Will use Jaeger icon from TechIcon
    if (lowerName.includes('ansible')) return TechIcons['Default']; // Will use Ansible icon from TechIcon
    if (lowerName.includes('typescript')) return TechIcons['Default']; // Will use TypeScript icon from TechIcon
    if (lowerName.includes('groovy')) return TechIcons['Default']; // Will use Groovy icon from TechIcon
    if (lowerName.includes('oracle')) return TechIcons['Default']; // Will use Oracle icon from TechIcon
    if (lowerName.includes('elasticache')) return TechIcons['Default']; // Will use ElastiCache icon from TechIcon
    if (lowerName.includes('prometheus')) return TechIcons['Default']; // Will use Prometheus icon from TechIcon
    if (lowerName.includes('grafana')) return TechIcons['Default']; // Will use Grafana icon from TechIcon
    if (lowerName.includes('bull')) return TechIcons['Default']; // Will use default icon for Bull Queue
    return TechIcons['Default'];
};

// Skills data organized by category with proficiency levels
const SKILLS_DATA = {
    'Cloud & Infrastructure': [
        { name: 'AWS', items: ['EC2', 'EKS', 'RDS Multi-AZ', 'ElastiCache', 'VPC', 'S3', 'Lambda', 'CloudWatch', 'IAM'], level: 'Intermediate' },
        { name: 'GCP', items: ['GKE', 'Cloud SQL'], level: 'Beginner' },
        { name: 'Oracle Cloud', items: ['Compute', 'Networking'], level: 'Beginner' },
        { name: 'Terraform', items: ['Modules', 'Remote State', 'Workspaces'], level: 'Intermediate' },
        { name: 'Ansible', items: ['Playbooks', 'Automation'], level: 'Beginner' },
    ],
    'Containers & Orchestration': [
        { name: 'Kubernetes', items: ['Deployments', 'StatefulSets', 'HPA', 'RBAC', 'NetworkPolicies'], level: 'Intermediate' },
        { name: 'Docker', items: ['Containers', 'Multi-stage Builds', 'Compose'], level: 'Intermediate' },
        { name: 'Helm', items: ['Charts', 'Releases'], level: 'Beginner' },
        { name: 'ArgoCD', items: ['GitOps', 'Sync', 'Rollouts'], level: 'Beginner' },
    ],
    'CI/CD & Automation': [
        { name: 'Jenkins', items: ['Pipelines', 'Groovy', 'Kubernetes Agents'], level: 'Intermediate' },
        { name: 'GitHub Actions', items: ['Workflows', 'CI/CD', 'Automated Testing'], level: 'Intermediate' },
        { name: 'GitOps', items: ['ArgoCD', 'Flux'], level: 'Beginner' },
    ],
    'Messaging & Data': [
        { name: 'RabbitMQ', items: ['Queue Processing', 'Pub/Sub'], level: 'Beginner' },
        { name: 'Redis', items: ['Pub/Sub', 'Caching'], level: 'Intermediate' },
        { name: 'Bull Queue', items: ['Job Processing'], level: 'Beginner' },
        { name: 'PostgreSQL', items: ['SQL', 'Optimization', 'Replication'], level: 'Intermediate' },
        { name: 'ElastiCache', items: ['Redis', 'Clustering'], level: 'Beginner' },
    ],
    'Monitoring & Security': [
        { name: 'Prometheus', items: ['Metrics', 'Alerts'], level: 'Intermediate' },
        { name: 'Grafana', items: ['Dashboards', 'Visualization'], level: 'Intermediate' },
        { name: 'Jaeger', items: ['Distributed Tracing'], level: 'Beginner' },
        { name: 'Zero-Trust', items: ['NetworkPolicies', 'RBAC'], level: 'Beginner' },
        { name: 'Security', items: ['tfsec', 'Checkov', 'VPC Flow Logs'], level: 'Beginner' },
    ],
    'Languages': [
        { name: 'Python', items: ['Scripting', 'Automation'], level: 'Intermediate' },
        { name: 'Bash', items: ['Shell Scripts'], level: 'Intermediate' },
        { name: 'Node.js', items: ['Backend', 'APIs'], level: 'Intermediate' },
        { name: 'TypeScript', items: ['Type Safety', 'Frontend'], level: 'Intermediate' },
        { name: 'YAML', items: ['Config', 'Manifests'], level: 'Intermediate' },
        { name: 'Groovy', items: ['Jenkins Pipelines'], level: 'Beginner' },
    ],
};

const proficiencyColors: Record<string, string> = {
    Expert: '#00ff41',
    Advanced: '#00d9ff',
    Intermediate: '#00d9ff',
    Beginner: '#ffbe0b',
};

// ... imports
import { AnimatePresence } from 'framer-motion';
import SkillExplosion from '../animations/SkillExplosion';

// ... existing code ...

// Floating skill pill component
function SkillPill({
    skill,
    index,
    categoryIndex,
    onClick
}: {
    skill: { name: string; items: string[]; level: string };
    index: number;
    categoryIndex: number;
    onClick: (skillName: string, color: string) => void;
}) {
    const [isHovered, setIsHovered] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const Icon = getIconForSkill(skill.name);
    const color = proficiencyColors[skill.level] || '#00d9ff';

    // 3D tilt effect
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 });
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
        setIsHovered(false);
    };

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
                delay: categoryIndex * 0.15 + index * 0.08,
                duration: 0.4,
                type: 'spring',
                stiffness: 200
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            onClick={() => onClick(skill.name, color)}
            style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
            className="relative group cursor-pointer"
        >
            {/* ... existing JSX ... */}
            {/* Glow effect */}
            <motion.div
                animate={{
                    opacity: isHovered ? 0.6 : 0,
                    scale: isHovered ? 1.1 : 1,
                }}
                className="absolute -inset-1 rounded-2xl blur-lg"
                style={{ background: `linear-gradient(135deg, ${color}40, transparent)` }}
            />

            {/* Main pill */}
            <div
                className={`
                    relative flex items-center gap-3 px-4 py-3
                    rounded-2xl
                    backdrop-blur-md
                    border transition-all duration-300
                    ${isHovered
                        ? 'bg-[rgba(22,27,34,0.8)] border-cyan-neon/60 shadow-[0_0_30px_rgba(0,217,255,0.3)]'
                        : 'bg-[rgba(22,27,34,0.5)] border-white/10'
                    }
                `}
                style={{ transform: 'translateZ(20px)' }}
            >
                {/* Icon */}
                <motion.div
                    animate={{
                        scale: isHovered ? 1.2 : 1,
                        rotate: isHovered ? [0, -5, 5, 0] : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="relative"
                >
                    <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{
                            background: `linear-gradient(135deg, ${color}20, ${color}05)`,
                            border: `1px solid ${color}30`,
                            color: color,
                        }}
                    >
                        <Icon className="w-5 h-5" />
                    </div>
                    {/* Pulse ring */}
                    {isHovered && (
                        <motion.div
                            animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                            transition={{ duration: 1, repeat: Infinity }}
                            className="absolute inset-0 rounded-xl"
                            style={{ border: `2px solid ${color}` }}
                        />
                    )}
                </motion.div>

                {/* Text content */}
                <div className="flex-1 min-w-0">
                    <h4 className="text-white font-medium text-sm group-hover:text-cyan-neon transition-colors">
                        {skill.name}
                    </h4>
                    <p className="text-text-muted text-xs truncate">
                        {skill.items.join(' • ')}
                    </p>
                </div>

                {/* Level badge */}
                <div
                    className="px-2 py-1 rounded-full text-xs font-mono"
                    style={{
                        background: `${color}15`,
                        color: color,
                        border: `1px solid ${color}30`,
                    }}
                >
                    {skill.level.charAt(0)}
                </div>
            </div>

            {/* Shine effect */}
            <motion.div
                animate={{
                    x: isHovered ? '150%' : '-100%',
                    opacity: isHovered ? 1 : 0,
                }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 pointer-events-none"
            />
        </motion.div>
    );
}

export default function SkillsSection() {
    const [activeSkill, setActiveSkill] = useState<{ name: string; color: string } | null>(null);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative space-y-10"
        >
            {/* Background orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{
                        x: [0, 40, 0],
                        y: [0, -30, 0],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute -top-20 right-0 w-80 h-80 bg-cyan-neon/20 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        x: [0, -30, 0],
                        y: [0, 40, 0],
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute bottom-0 -left-20 w-60 h-60 bg-magenta-neon/15 rounded-full blur-3xl"
                />
            </div>

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative z-10 text-center md:text-left"
            >
                <h2 className="font-terminal text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-neon via-white to-magenta-neon mb-3">
                    Skills & Technologies
                </h2>
                <p className="text-text-secondary text-lg">
                    Technical expertise across cloud, DevOps, and development
                </p>
            </motion.div>

            {/* Mobile Interaction Hint */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="md:hidden flex justify-center items-center gap-2 text-cyan-neon/60 text-xs font-mono mb-4"
            >
                <div className="w-4 h-4 rounded-full border border-cyan-neon/40 flex items-center justify-center animate-pulse">
                    <div className="w-2 h-2 bg-cyan-neon/60 rounded-full" />
                </div>
                <span>Tap skills to explore</span>
            </motion.div>



            {/* Skills Grid by Category */}
            <div className="relative z-10 space-y-8">
                {Object.entries(SKILLS_DATA).map(([category, skills], categoryIndex) => (
                    <motion.div
                        key={category}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: categoryIndex * 0.1 }}
                    >
                        {/* Category header */}
                        <div className="flex items-center gap-3 mb-4">
                            <div className="h-px flex-1 bg-gradient-to-r from-cyan-neon/50 to-transparent" />
                            <h3 className="font-terminal text-sm text-cyan-neon uppercase tracking-wider">
                                {category}
                            </h3>
                            <div className="h-px flex-1 bg-gradient-to-l from-cyan-neon/50 to-transparent" />
                        </div>

                        {/* Skills pills */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 perspective-1000">
                            {skills.map((skill, index) => (
                                <SkillPill
                                    key={skill.name}
                                    skill={skill}
                                    index={index}
                                    categoryIndex={categoryIndex}
                                    onClick={(name, color) => setActiveSkill({ name, color })}
                                />
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Legend */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="relative z-10 flex flex-wrap justify-center md:justify-start gap-4 pt-4"
            >
                {Object.entries(proficiencyColors).map(([level, color]) => (
                    <div key={level} className="flex items-center gap-2 text-xs">
                        <div
                            className="w-3 h-3 rounded-full"
                            style={{ background: color, boxShadow: `0 0 10px ${color}50` }}
                        />
                        <span className="text-text-muted font-mono">{level}</span>
                    </div>
                ))}
            </motion.div>

            {/* Explosion Animation Overlay */}
            <AnimatePresence>
                {activeSkill && (
                    <SkillExplosion
                        skillName={activeSkill.name}
                        color={activeSkill.color}
                        onComplete={() => setActiveSkill(null)}
                    />
                )}
            </AnimatePresence>
        </motion.div>
    );
}

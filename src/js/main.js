
Vue.component('modal', {
    template: '#quickview-template'
});

const app = new Vue({
    el: '#app',
    data() {
        return {
            nav: [
                {text: 'Резюме', url: '#resume'},
                {text: 'Порфолио', url: '#portfolio'}
            ],
            years: [
                {year: '2018'},
                {year: '2017'},
                {year: '2016'},
                {year: '2015'},
                {year: '2014'},
                {year: '2013'},
                {year: '2012'},
                {year: '2011'},
                {year: '2009'},
            ],
            workExperience : [
                {
                    indexNumber: '.zero',
                    year: '2005-2013',
                    employer: 'several companies engaged in the development of sites',
                    position: 'content-manager, &nbsp; designer, &nbsp; xhtml/css coder',
                    responsibility: 'content, &nbsp; design, &nbsp; html/css coding'
                },{
                    indexNumber: '.first',
                    year: '2013-2015',
                    employer: 'Dextra Internet Agency',
                    position: 'Frontend-developer',
                    responsibility: 'development and support of frontend sites and services'
                },{
                    indexNumber: '.second',
                    year: '2015-2016',
                    employer: 'Forin company',
                    position: 'Frontend-developer',
                    responsibility: 'development and support of frontend sites, services and CRM'
                },{
                    indexNumber: '.third',
                    year: '2016-2017',
                    employer: 'Radar Advertising',
                    position: 'Frontend-developer',
                    responsibility: 'development and support of frontend sites'
                },{
                    indexNumber: '.fourth',
                    year: '07.2017-12.2017',
                    employer: 'D-Element Internet Agency',
                    position: 'Frontend-developer',
                    responsibility: 'development and support of frontend sites'
                },{
                    indexNumber: '.fifth',
                    year: '02.2018-now',
                    employer: 'P&B Stratwork',
                    position: 'Frontend-developer',
                    responsibility: 'development and support of frontend CRM'
                }
            ],
            portfolio: [
                {
                    id: '001',
                    year: '2018',
                    month: 'февраль',
                    img: 'img/portfolio/activist.jpg',
                    name: 'CRM для управления предвыборной кампанией &#171;Активист&#187;',
                    descriptionImg: 'img/portfolio/activist.jpg',
                    description: 'Проект призван упростить управление предвыборной кампанией предоставив пользователю обширный набор инструментов для контроля и отчетности.',
                    client: '&#171;P&B Stratwork&#187;',
                    currentClass: 'is-large',
                    isExist: false,
                    isYear: true,
                    exLink: '',
                    status: '- н.в.',
                    isVisible: true,
                    showModal: false
                },{
                    id: '002',
                    year: '2017',
                    month: 'ноябрь',
                    img: 'img/portfolio/traktor.jpg',
                    name: 'Продажа электронных билетов ХК &#171;Трактор&#187;',
                    descriptionImg: 'img/portfolio/screens/traktor_buking.png',
                    description: 'Система продажи электронных билетов с выбором по секторам.',
                    client: '&#171;Цифровой Элемент&#187;',
                    currentClass: '',
                    isExist: true,
                    isYear: true,
                    exLink: 'https://booking.hctraktor.org/',
                    status: '',
                    isVisible: true
                }, {
                    id: '003',
                    year: '2017',
                    month: 'сентябрь',
                    img: 'img/portfolio/korvet.jpg',
                    name: 'Сайт группы компаний &#171;Корвет&#187;',
                    descriptionImg: 'img/portfolio/screens/port18.png',
                    description: 'Группа компаний «Корвет» производит и поставляет современное насосное оборудование, незаменимое для нефтебаз, наливных эстакад, при бункеровке судов, в системах промстоков и промотходов, при аварийных ситуациях для перекачки вязких жидкостей, а также при проливах нефти и нефтепродуктов.',
                    client: '&#171;Цифровой Элемент&#187;',
                    currentClass: '',
                    isExist: true,
                    isYear: false,
                    exLink: 'https://www.oilpump.ru/',
                    status: '',
                    isVisible: true
                },{
                    id: '004',
                    year: '2017',
                    month: 'август',
                    img: 'img/portfolio/dijeans.jpg',
                    name: 'Интернет-магазин Диджинс',
                    descriptionImg: 'img/portfolio/screens/dijeans-s.png',
                    description: 'Одна из крупнейших сетей магазинов одежды в России',
                    client: '&#171;Цифровой Элемент&#187;',
                    currentClass: '',
                    isExist: true,
                    isYear: false,
                    exLink: 'https://dijeans.ru/',
                    status: '',
                    isVisible: true
                },
                {
                    id: '005',
                    year: '2017',
                    month: 'июль',
                    img: 'img/portfolio/symphony.jpg',
                    name: 'Промо-сайт освежителей воздуха &#171;Symphony&#187;',
                    descriptionImg: 'img/portfolio/screens/symphony-s.png',
                    description: 'Компания &#171;Арнест&#187; &mdash; лидер российского рынка парфюмерно-косметической продукции и товаров бытовой химии. <br>' +
                    'Symphony &mdash; серия средств для создания атмосферы свежести и уюта в доме.',
                    client: '&#171;Radar Advertising&#187;',
                    currentClass: '',
                    isExist: true,
                    isYear: false,
                    exLink: 'http://my-symphony.ru/',
                    status: '',
                    isVisible: true
                },{
                    id: '006',
                    year: '2017',
                    month: 'март',
                    img: 'img/portfolio/newton.jpg',
                    name: 'Сайт жилого комплекса &#171;Ньютон&#187;',
                    descriptionImg: 'img/portfolio/screens/newton-s.png',
                    description: 'Жилой Комплекс &#171;Ньютон&#187; находится на северо-западе города Челябинска в 20 и 30-м микрорайонах, в шаговой доступности от ледовой арены «Трактор».',
                    client: '&#171;Radar Advertising&#187;',
                    currentClass: '',
                    isExist: true,
                    isYear: false,
                    exLink: 'http://ньютон74.рф/',
                    status: '',
                    isVisible: true
                },{
                    id: '007',
                    year: '2016',
                    month: 'ноябрь',
                    img: 'img/portfolio/topkran.jpg',
                    name: 'Сайт компании ТОПКРАН',
                    descriptionImg: 'img/portfolio/screens/topkran-s.png',
                    description: 'ТОПКРАН &mdash; предприятие, работающее на строительном рынке Уральского Федерального Округа.<br>' +
                    'Cпециализируется на aренде, продаже, монтаже и обслуживании башенных кранов.<br>\n' +
                    'Компания располагает собственным парком башенных кранов и квалифицированным штатом специалистов.',
                    client: 'ООО &#171;ТопКран&#187;',
                    currentClass: '',
                    isExist: true,
                    isYear: true,
                    exLink: 'https://topcran.ru/',
                    status: '',
                    isVisible: true
                },{
                    id: '008',
                    year: '2016',
                    month: '',
                    img: 'img/portfolio/umney.jpg',
                    name: 'Личный кабинет абитуриента на Умней.ру',
                    descriptionImg: 'img/portfolio/screens/umney-s.png',
                    description: 'Умней.ру - портал дистанционного образования',
                    client: '&#171;ИнТиго&#187;',
                    currentClass: '',
                    isExist: true,
                    isYear: false,
                    exLink: 'https://umney.ru/',
                    status: '',
                    isVisible: true
                },{
                    id: '009',
                    year: '2016',
                    month: '',
                    img: 'img/portfolio/k-flex.jpg',
                    name: 'Личный кабинет дилера K-FLEX',
                    descriptionImg: 'img/portfolio/screens/k-flex-s.png',
                    description: '&#171;К-ФЛЕКС&#187; &mdash; производитель технической теплоизоляции из вспененного каучука',
                    client: '&#171;ИнТиго&#187;',
                    currentClass: '',
                    isExist: true,
                    isYear: false,
                    exLink: 'http://k-flex.ru/',
                    status: '',
                    isVisible: true
                },{
                    id: '010',
                    year: '2016',
                    month: '',
                    img: 'img/portfolio/60mIS.jpg',
                    name: '&#171;60 минут&#187; IS',
                    descriptionImg: 'img/portfolio/screens/60mIS-s.png',
                    description: 'Система поиска и бронирования номеров',
                    client: '&#171;Форин&#187;',
                    currentClass: '',
                    isExist: true,
                    isYear: false,
                    exLink: 'portfolio/60mIS/index.html',
                    status: '',
                    isVisible: true
                },{
                    id: '011',
                    year: '2016',
                    month: '',
                    img: 'img/portfolio/blueshotel.jpg',
                    name: 'Шаблон BluesHotel сайта отеля',
                    descriptionImg: 'img/portfolio/blueshotel.jpg',
                    description: 'Шаблон BluesHotel сайта отеля.',
                    client: '&#171;Форин&#187;',
                    currentClass: '',
                    isExist: true,
                    isYear: false,
                    exLink: 'portfolio/BluesHotel/index.html',
                    status: '',
                    isVisible: true
                },{
                    id: '012',
                    year: '2016',
                    month: '',
                    img: 'img/portfolio/60m.jpg',
                    name: '&#171;60 минут&#187;',
                    descriptionImg: 'img/portfolio/60m.jpg',
                    description: 'Система управления отелем',
                    client: '&#171;Форин&#187;',
                    currentClass: '',
                    isExist: true,
                    isYear: false,
                    exLink: 'portfolio/60m/index.html',
                    status: '',
                    isVisible: true
                },{
                    id: '013',
                    year: '2015',
                    month: '',
                    img: 'img/portfolio/kalinka.jpg',
                    name: 'Сайт мясокомбината &#171;Калинка&#187;',
                    client: '&#171;Dextra&#187;',
                    descriptionImg: 'img/portfolio/kalinka.jpg',
                    description: 'Группа компаний «Калинка» основана в 1998 году и за это время успела себя зарекомендовать как стабильное и устойчивое предприятие с прогрессивными технологиями производства.<br>Сегодня «Калинка» - это одна из крупнейших мясоперерабатывающих компаний в Уральском регионе.',
                    currentClass: '',
                    isExist: true,
                    isYear: true,
                    exLink: 'http://www.kalinka74.ru/',
                    status: '',
                    isVisible: true
                },{
                    id: '014',
                    year: '2015',
                    month: '',
                    img: 'img/portfolio/kerg.jpg',
                    name: 'Керг Клуб',
                    descriptionImg: 'img/portfolio/kerg.jpg',
                    description: '&#171;Автоцентр Керг&#187; в статусе официального дилера в городе Челябинске работает с 2002 г. и в течение многих лет показывает высокие результаты в продаже и сервисном обслуживании автомобилей, как легковых, так и коммерческих.',
                    client: '&#171;Dextra&#187;',
                    currentClass: '',
                    isExist: true,
                    isYear: false,
                    exLink: 'http://kerg-club.ru/chel/',
                    status: '',
                    isVisible: true
                },{
                    id: '016',
                    year: '2015',
                    month: '',
                    img: 'img/portfolio/traktor.jpg',
                    name: 'Официальный сайт хоккейного клуба &#171;Трактор&#187;',
                    descriptionImg: 'img/portfolio/traktor.jpg',
                    description: 'Официальный сайт хоккейного клуба &#171;Трактор&#187;',
                    client: '&#171;Dextra&#187;',
                    currentClass: '',
                    isExist: true,
                    isYear: false,
                    exLink: 'http://hctraktor.org/',
                    status: '',
                    isVisible: true
                },{
                    id: '017',
                    year: '2015',
                    month: '',
                    img: 'img/portfolio/dextra.jpg',
                    name: 'Сайт интернет-агенства Dextra&#187;',
                    descriptionImg: 'img/portfolio/dextra.jpg',
                    description: 'Собственный сайт интернет-агенства Dextra&#187;',
                    client: '&#171;Dextra&#187;',
                    currentClass: '',
                    isExist: true,
                    isYear: false,
                    exLink: 'http://dextra.ru/',
                    status: '',
                    isVisible: true
                },{
                    id: '018',
                    year: '2015',
                    month: '',
                    name: 'Санаторий Изумруд Медицинский центр ЧТПЗ',
                    client: '&#171;Dextra&#187;',
                    img: 'img/portfolio/izumrud.jpg',
                    descriptionImg: 'img/portfolio/izumrud.jpg',
                    description: 'Сайт санатория',
                    currentClass: '',
                    isExist: true,
                    isYear: false,
                    exLink: 'http://izumrud-mc.ru/',
                    status: '',
                    isVisible: true
                },{
                    id: '019',
                    year: '2015',
                    name: 'Доска объявлений Аванатра',
                    month: '',
                    client: '&#171;Dextra&#187;',
                    img: 'img/portfolio/avanatra.jpg',
                    descriptionImg: 'img/portfolio/avanatra.jpg',
                    currentClass: '',
                    isExist: true,
                    isYear: false,
                    exLink: 'http://avanatra.ru/',
                    status: '',
                    isVisible: true
                },{
                    id: '020',
                    year: '2015',
                    name: 'Портал OpenSauna',
                    month: '',
                    client: '&#171;Dextra&#187;',
                    img: 'img/portfolio/opensauna.jpg',
                    currentClass: '',
                    isExist: true,
                    isYear: false,
                    exLink: 'http://opensauna.ru/',
                    status: '',
                    isVisible: true
                },{
                    id: '021',
                    year: '2015',
                    name: 'Магазин модной одежды &#171;Online-fashion&#187;',
                    month: '',
                    client: '&#171;Dextra&#187;',
                    img: 'img/portfolio/online-fashion.jpg',
                    currentClass: '',
                    isExist: true,
                    isYear: false,
                    exLink: 'http://www.online-fashion.ru/',
                    status: '',
                    isVisible: true
                },{
                    id: '022',
                    year: '2015',
                    name: 'Сайт салона элитной керамики и сантехники INCRUSTO',
                    month: '',
                    client: '&#171;Dextra&#187;',
                    img: 'img/portfolio/incrusto.jpg',
                    currentClass: '',
                    isExist: true,
                    isYear: false,
                    exLink: 'http://incrusto.ru/',
                    status: '',
                    isVisible: true
                },{
                    id: '023',
                    year: '2015',
                    name: 'Сайт компании &#171;МВА&#187;',
                    month: '',
                    client: '&#171;Dextra&#187;',
                    img: 'img/portfolio/mva.jpg',
                    currentClass: '',
                    isExist: true,
                    isYear: false,
                    exLink: 'http://www.ptfmva.ru/',
                    status: '',
                    isVisible: true
                },{
                    id: '024',
                    year: '2014',
                    name: 'Frontend фирменной CMS',
                    month: '',
                    client: '&#171;Dextra&#187;',
                    img: 'img/portfolio/dextra-cms.jpg',
                    currentClass: '',
                    isExist: false,
                    isYear: true,
                    exLink: '',
                    status: '',
                    isVisible: true
                },{
                    id: '025',
                    year: '2014',
                    name: 'Сайт агенства Zotov',
                    month: '',
                    client: '&#171;Dextra&#187;',
                    img: 'img/portfolio/zotov.jpg',
                    currentClass: '',
                    isExist: true,
                    isYear: false,
                    exLink: 'http://zotov-event.ru/',
                    status: '',
                    isVisible: true
                },{
                    id: '026',
                    year: '2014',
                    name: 'Сайт медицинского центра &#171;Наркология&#187;',
                    month: '',
                    client: '&#171;Dextra&#187;',
                    img: 'img/portfolio/nark.jpg',
                    currentClass: '',
                    isExist: true,
                    isYear: false,
                    exLink: 'http://narkologia74.ru/',
                    status: '',
                    isVisible: true
                },{
                    id: '027',
                    year: '2014',
                    name: 'Интернет-магазин профессионального инструмента',
                    month: '',
                    client: '&#171;Dextra&#187;',
                    img: 'img/portfolio/tools.jpg',
                    currentClass: '',
                    isExist: true,
                    isYear: false,
                    exLink: 'http://standarttool.ru/',
                    status: '',
                    isVisible: true
                },{
                    id: '028',
                    year: '2014',
                    name: 'Сайт компании &#171;Вендорс&#187;',
                    month: '',
                    client: '&#171;Dextra&#187;',
                    img: 'img/portfolio/vendors.jpg',
                    currentClass: '',
                    isExist: true,
                    isYear: false,
                    exLink: 'https://www.torgavtomat.ru/',
                    status: '',
                    isVisible: true
                },{
                    id: '029',
                    year: '2014',
                    name: 'Сайт компании &#171;Глобальные ресурсы&#187;',
                    month: '',
                    client: '&#171;Dextra&#187;',
                    img: 'img/portfolio/globalres.jpg',
                    currentClass: '',
                    isExist: true,
                    isYear: false,
                    exLink: 'http://globalres.ru/',
                    status: '',
                    isVisible: true
                },{
                    id: '030',
                    year: '2014',
                    name: 'Интернет магазин ХК Трактор',
                    month: '',
                    client: '&#171;Dextra&#187;',
                    img: 'img/portfolio/traktor-store.jpg',
                    currentClass: '',
                    isExist: true,
                    isYear: false,
                    exLink: 'http://shoptraktor.ru/',
                    status: '',
                    isVisible: true
                },{
                    id: '031',
                    year: '2013',
                    name: 'Мобильная версия портала &#171;Челябинск Сегодня&#187;',
                    month: '',
                    client: '&#171;Dextra&#187;',
                    img: 'img/portfolio/cheltoday.jpg',
                    currentClass: '',
                    isExist: true,
                    isYear: true,
                    exLink: 'http://m.cheltoday.ru/',
                    status: '',
                    isVisible: true
                },{
                    id: '032',
                    year: '2013',
                    name: 'Сайт компании &#171;Комфортика&#187;',
                    month: '',
                    client: '&#171;Dextra&#187;',
                    img: 'img/portfolio/komfortica.jpg',
                    currentClass: '',
                    isExist: true,
                    isYear: false,
                    exLink: 'http://komfortica.ru/',
                    status: '',
                    isVisible: true
                },{
                    id: '033',
                    year: '2013',
                    name: 'Сайт детского игрового центра ЛЕГО',
                    month: '',
                    client: '&#171;Dextra&#187;',
                    img: 'img/portfolio/lego.jpg',
                    currentClass: '',
                    isExist: true,
                    isYear: false,
                    exLink: 'http://playconstructor.ru/',
                    status: '',
                    isVisible: true
                },{
                    id: '034',
                    year: '2013',
                    name: 'Информационно-аналитический портал &#171;Челябинск Сегодня&#187;',
                    month: '',
                    client: '&#171;Dextra&#187;',
                    img: 'img/portfolio/cheltoday.jpg',
                    currentClass: '',
                    isExist: true,
                    isYear: false,
                    exLink: 'http://cheltoday.ru/',
                    status: '',
                    isVisible: true
                },{
                    id: '035',
                    year: '2013',
                    name: 'Сайт клуба практикующих врачей',
                    month: '',
                    client: '&#171;Автоматизация бизнеса&#187;',
                    img: 'img/portfolio/ivrach.jpg',
                    currentClass: '',
                    isExist: true,
                    isYear: false,
                    exLink: 'http://ivrach.com/',
                    status: '',
                    isVisible: true
                },{
                    id: '036',
                    year: '2013',
                    name: 'Сайт Лицея №77',
                    month: '',
                    client: 'Лицей №77',
                    img: 'img/portfolio/lyceum.jpg',
                    currentClass: '',
                    isExist: true,
                    isYear: false,
                    exLink: 'http://www.lyceum77.ru/',
                    status: '',
                    isVisible: true
                }, {
                    id: '037',
                    year: '2012',
                    name: 'Сайт группы компаний &#171;Бизнес-Сервис&#187;',
                    month: '',
                    client: '&#171;WebGranula&#187;',
                    img: 'img/portfolio/bis74.jpg',
                    currentClass: '',
                    isExist: true,
                    isYear: true,
                    exLink: 'http://www.bis74.ru/',
                    status: '',
                    isVisible: true
                },{
                    id: '038',
                    year: '2011',
                    name: 'Сайт компании &#171;Верничи&#187;',
                    month: '',
                    client: '&#171;WebGranula&#187;',
                    img: 'img/portfolio/vernici.jpg',
                    currentClass: '',
                    isExist: true,
                    isYear: true,
                    exLink: 'http://www.vernici.ru/',
                    status: '',
                    isVisible: true
                },{
                    id: '039',
                    year: '2011',
                    name: 'Сайт спортивных прогнозов',
                    month: '',
                    client: '&#171;WebGranula&#187;',
                    img: 'img/portfolio/cleverbetting.jpg',
                    currentClass: '',
                    isExist: true,
                    isYear: false,
                    exLink: 'http://www.cleverbetting.ru/',
                    status: '',
                    isVisible: true
                },{
                    id: '040',
                    year: '2009',
                    name: 'Сайт компании &#171;Труд-Сервис&#187;',
                    month: '',
                    client: '&#171;1М-сервис&#187;',
                    img: 'img/portfolio/trud.jpg',
                    currentClass: '',
                    isExist: true,
                    isYear: true,
                    exLink: 'http://www.trud-servis.ru/',
                    status: '',
                    isVisible: true
                },{
                    year: '2005',
                    currentClass: 'is-large',
                    isYear: true,
                    isVisible: false
                }
            ],
            remake: [
                {
                    year: '2017',
                    name: 'Шинный центр «Шининвест»',
                    client: '&#171;Цифровой Элемент&#187;',
                    isExist: true,
                    isYear: true,
                    exLink: 'https://shininvest.ru/',
                    exLinkText: 'shininvest.ru',
                },{
                    year: '2016',
                    name: 'Спутник — сообщество наставников и предпринимателей',
                    client: '&#171;Форин&#187;',
                    isExist: true,
                    isYear: true,
                    exLink: 'http://sputnik.global/',
                    exLinkText: 'sputnik.global',
                },{
                    year: '2014',
                    name: 'Интернет-магазин &#171;Вещи для дома&#187;',
                    client: '&#171;Supra.pro&#187;',
                    isExist: false,
                    isYear: true,
                    exLink: '',
                    exLinkText: '',
                },{
                    year: '2014',
                    name: 'Юридическая фирма &#171;Авангард&#187;',
                    client: '&#171;Цифровой Элемент&#187;',
                    isExist: true,
                    isYear: false,
                    exLink: 'http://авангард74.рф/',
                    exLinkText: 'авангард74.рф',
                },{
                    year: '2014',
                    name: 'ElectroStudio',
                    client: '&#171;Supra.pro&#187;',
                    isExist: false,
                    isYear: false,
                    exLink: '',
                    exLinkText: '',
                },{
                    year: '2014',
                    name: 'Страница генерального плана застройки для сайта посёлка &#171;Княжий&#187;',
                    client: '&#171;Dextra&#187;',
                    isExist: true,
                    isYear: false,
                    exLink: 'http://княжий.рф/genplan/',
                    exLinkText: 'княжий.рф',
                },{
                    year: '2014',
                    name: 'Сайт группы производственный компаний &#171;Эмис&#187;',
                    client: '&#171;Dextra&#187;',
                    isExist: true,
                    isYear: false,
                    exLink: 'http://emis-kip.ru/',
                    exLinkText: 'emis-kip.ru',
                },{
                    year: '2014',
                    name: 'Интернет-магазин сети аптек &#171;Рифарм&#187;',
                    client: '&#171;Dextra&#187;',
                    isExist: true,
                    isYear: false,
                    exLink: 'http://rifarm.ru/',
                    exLinkText: 'rifarm.ru',
                },{
                    year: '2014',
                    name: 'Торговая компания &#171;Химик&#187;',
                    client: '&#171;Dextra&#187;',
                    isExist: true,
                    isYear: false,
                    exLink: 'http://himik-ural.ru/',
                    exLinkText: 'himik-ural.ru',
                },{
                    year: '2014',
                    name: '&#171;Новые Технологии&#187; г. Пласт',
                    client: '&#171;Dextra&#187;',
                    isExist: true,
                    isYear: false,
                    exLink: 'http://смлпласт.рф/',
                    exLinkText: 'смлпласт.рф',
                },{
                    year: '2014',
                    name: 'Стоматологическая клиника &#171;Птичка Тари&#187;',
                    client: '&#171;Цифровой элемент&#187;',
                    isExist: true,
                    isYear: false,
                    exLink: 'http://stom-tari.com/',
                    exLinkText: 'stom-tari.com',
                },{
                    year: '2014',
                    name: 'Лэндинг &#171;ИннЭко – ЮУрГУ&#187;',
                    client: '&#171;Цифровой элемент&#187;',
                    isExist: false,
                    isYear: false,
                    exLink: '',
                    exLinkText: '',
                },{
                    year: '2013',
                    name: 'Сайт доставки еды Хит Пицца',
                    client: '&#171;Dextra&#187;',
                    isExist: true,
                    isYear: true,
                    exLink: 'http://hit-pizza.ru/',
                    exLinkText: 'hit-pizza.ru',
                },{
                    year: '2013',
                    name: 'Интернет-магазин по продаже шин и дисков',
                    client: 'megashina74.ru',
                    isExist: false,
                    isYear: false,
                    exLink: '',
                    exLinkText: '',
                },{
                    year: '2013',
                    name: 'Лэндинг акции для стоматологии «СитиСмайл»',
                    client: '&#171;Dextra&#187;',
                    isExist: false,
                    isYear: false,
                    exLink: '',
                    exLinkText: '',
                },{
                    year: '2013',
                    name: 'Интернет-магазин электроники',
                    client: '&#171;2eng.ru&#187;',
                    isExist: true,
                    isYear: false,
                    exLink: 'http://biztorg.ru/view/33865709?newsletter=126',
                    exLinkText: 'naviatika.ru',
                },{
                    year: '2012',
                    name: 'Промо-сайт мобильного приложения Poker Tools',
                    client: '&#171;AppGranula&#187;',
                    isExist: true,
                    isYear: true,
                    exLink: 'http://pokertoolsapp.com/',
                    exLinkText: 'pokertoolsapp.com',
                },{
                    year: '2012',
                    name: 'Сайт студии суши &#171;Япония&#187;',
                    client: '&#171;Студия суши Япония&#187;',
                    isExist: true,
                    isYear: false,
                    exLink: 'http://japan74.ru/',
                    exLinkText: 'japan74.ru',
                },{
                    year: '2012',
                    name: 'Промо-сайт Взаботе',
                    client: '&#171;WebGranula&#187;',
                    isExist: true,
                    isYear: false,
                    exLink: 'http://взаботеокаждом.рф/',
                    exLinkText: 'взаботеокаждом.рф',
                },{
                    year: '2012',
                    name: 'Система поиска и сравнения цен на товары первой необходимости Взаботе',
                    client: '&#171;WebGranula&#187;',
                    isExist: true,
                    isYear: false,
                    exLink: 'http://vzabote.ru/',
                    exLinkText: 'vzabote.ru',
                },{
                    year: '2012',
                    name: 'Система управления контекстной рекламой TravelContext',
                    client: '&#171;TravelContext&#187;',
                    isExist: true,
                    isYear: false,
                    exLink: 'http://travelcontext.ru/',
                    exLinkText: 'travelcontext.ru',
                },{
                    year: '2012',
                    name: 'Сайт студии суши &#171;Японамать&#187;',
                    client: '&#171;Студия Японамать&#187;',
                    isExist: true,
                    isYear: false,
                    exLink: 'http://japonamat.ru/',
                    exLinkText: 'japonamat.ru',
                },{
                    year: '2011',
                    name: 'Гид по ценам Neiron',
                    client: '&#171;WebGranula&#187;',
                    isExist: true,
                    isYear: true,
                    exLink: 'http://neiron.com/',
                    exLinkText: 'neiron.com',
                },{
                    year: '2010',
                    name: 'Сайт компании &#171;Компрессорная техника&#187;',
                    client: '&#171;WebGranula&#187;',
                    isExist: true,
                    isYear: true,
                    exLink: 'http://kkt.su/',
                    exLinkText: 'kkt.su',
                },{
                    year: '2010',
                    name: 'Сайт санатория &#171;Жемчужина Урала&#187;',
                    client: '&#171;1М-сервис&#187;',
                    isExist: true,
                    isYear: false,
                    exLink: 'http://ural-pearl.ru/',
                    exLinkText: 'ural-pearl.ru',
                },{
                    year: '2010',
                    name: 'Сайт студии WebGranula',
                    client: '&#171;WebGranula&#187;',
                    isExist: true,
                    isYear: false,
                    exLink: 'http://webgranula.ru/',
                    exLinkText: 'webgranula.ru',
                },{
                    year: '2010',
                    name: 'Сайт Института Информационных Технологий при ЧелГУ',
                    client: '&#171;WebGranula&#187;',
                    isExist: true,
                    isYear: false,
                    exLink: 'http://iit.csu.ru/',
                    exLinkText: 'iit.csu.ru',
                },{
                    year: '2010',
                    name: 'Страница главного федерального инспектора Челябинской области',
                    client: 'Студия &#171;weB2Biz&#187;',
                    isExist: true,
                    isYear: false,
                    exLink: 'http://pravmin74.ru/default.aspx?p_id=1976',
                    exLinkText: 'pravmin74.ru',
                },{
                    year: '2010',
                    name: 'Cайт группы компаний &#171;Россторм&#187;',
                    client: '&#171;Грид-Инжиниринг&#187;',
                    isExist: true,
                    isYear: false,
                    exLink: 'http://rosstrom.ru/',
                    exLinkText: 'rosstrom.ru',
                },{
                    year: '2010',
                    name: 'Cайт министерства образования Челябинской области',
                    client: 'Студия &#171;weB2Biz&#187;',
                    isExist: true,
                    isYear: false,
                    exLink: 'http://minobr74.ru/',
                    exLinkText: 'minobr74.ru',
                },{
                    year: '2009',
                    name: 'Компания &#171;Эксперт-Лизинг&#187;',
                    client: '&#171;Грид-Инжиниринг&#187;',
                    isExist: true,
                    isYear: true,
                    exLink: 'http://ekspert-leasing.ru/',
                    exLinkText: 'ekspert-leasing.ru',
                },{
                    year: '2009',
                    name: 'Проект mahatma.me',
                    client: '&#171;Грид-Инжиниринг&#187;',
                    isExist: true,
                    isYear: false,
                    exLink: 'http://mahatma.me/',
                    exLinkText: 'mahatma.me',
                },{
                    year: '2009',
                    name: 'Сайт ресторана &#171;Сицилия&#187;',
                    client: '&#171;1М-сервис&#187;',
                    isExist: true,
                    isYear: false,
                    exLink: 'http://sicilia74.ru/',
                    exLinkText: 'sicilia74.ru',
                },{
                    year: '2009',
                    name: 'Студия переплета &#171;Релье&#187;',
                    client: 'Компания &#171;Ковчег Урал&#187;',
                    isExist: true,
                    isYear: false,
                    exLink: 'http://relier.ru/',
                    exLinkText: 'relier.ru',
                },{
                    year: '2009',
                    name: 'Студия &#171;Rusdeco&#187;',
                    client: 'Компания &#171;Ковчег Урал&#187;',
                    isExist: true,
                    isYear: false,
                    exLink: 'http://rusdeco.ru/',
                    exLinkText: 'rusdeco.ru',
                },{
                    year: '2008',
                    name: 'Сайт компании &#171;Торекс&#187;',
                    client: 'Студия &#171;weB2Biz&#187;',
                    isExist: true,
                    isYear: true,
                    exLink: 'http://torex74.ru/',
                    exLinkText: 'torex74.ru',
                },{
                    year: '2008',
                    name: 'Сайт компании &#171;Ковчег Урал&#187;',
                    client: 'Компания &#171;Ковчег Урал&#187;',
                    isExist: true,
                    isYear: false,
                    exLink: 'http://kovchegural.ru/',
                    exLinkText: 'kovchegural.ru',
                },{
                    year: '2008',
                    name: 'Главное контрольное управление Челябинской области',
                    client: 'Студия &#171;weB2Biz&#187;',
                    isExist: true,
                    isYear: false,
                    exLink: 'http://gku74.ru/',
                    exLinkText: 'gku74.ru',
                },{
                    year: '2008',
                    name: 'Административная реформа в Челябинской области',
                    client: 'Студия &#171;weB2Biz&#187;',
                    isExist: true,
                    isYear: false,
                    exLink: 'http://adminref74.ru/',
                    exLinkText: 'adminref74.ru',
                },{
                    year: '2008',
                    name: 'Общественная палата Челябинской области',
                    client: 'Студия &#171;weB2Biz&#187;',
                    isExist: true,
                    isYear: false,
                    exLink: 'http://op74.ru/',
                    exLinkText: 'op74.ru',
                },{
                    year: '2008',
                    name: 'Челябинское региональное объединение работодателей &#171;ПРОМАСС&#187;',
                    client: 'Студия &#171;weB2Biz&#187;',
                    isExist: true,
                    isYear: false,
                    exLink: 'http://promas.ru/',
                    exLinkText: 'promas.ru',
                },{
                    year: '2008',
                    name: 'Следственное управление Челябинской области',
                    client: 'Студия &#171;weB2Biz&#187;',
                    isExist: true,
                    isYear: false,
                    exLink: 'http://chelsupr.ru/',
                    exLinkText: 'chelsupr.ru',
                },{
                    year: '2008',
                    name: 'Министерство культуры Челябинской области',
                    client: 'Студия &#171;weB2Biz&#187;',
                    isExist: true,
                    isYear: false,
                    exLink: 'http://culture-chel.ru/',
                    exLinkText: 'culture-chel.ru',
                },{
                    year: '2008',
                    name: 'Министерство финансов Челябинской области',
                    client: 'Студия &#171;weB2Biz&#187;',
                    isExist: true,
                    isYear: false,
                    exLink: 'http://minfin74.ru/',
                    exLinkText: 'minfin74.ru',
                },{
                    year: '2008',
                    name: 'Группа компаний &#171;Южуралзолото&#187;',
                    client: 'Студия &#171;weB2Biz&#187;',
                    isExist: true,
                    isYear: false,
                    exLink: 'http://ugold.ru/',
                    exLinkText: 'ugold.ru',
                },{
                    year: '2005-2007',
                    isYear: true,
                    name: '',
                },
            ]
        }
    },
});

bulmaQuickview.attach();

// переписать на es6 по примеру ниже
//
// window.onload = function(e){
//     const pageloader = document.querySelector('.pageloader');
//     setTimeout( function() {
//         pageloader.classList.remove('is-active');
//     }, 3000 );
// };
//
// const resL = document.querySelector('.resume-link');
//
// resL.click(function(e) {
//     e.preventDefault();
//     document.querySelector('#resume-text').slideToggle('slow');
// });
//


    $('.resume-link').click(function(e) {
        e.preventDefault();
        $('.resume-wrapper').slideToggle('slow');
    });

    $('.remake-link').click(function(e) {
        e.preventDefault();
        $('.remake-wrapper').slideToggle('slow');
    });

    $(window).on('load', function(e) {
        setTimeout( function() {
            $('.pageloader').removeClass('is-active');
        }, 3000 );
    });


    // tags filter ---------------------------------------------------------------------------------------------------

    $('.portfolio-nav a').click(function (e) {
        e.preventDefault();
        if ($(this).hasClass('is-warning')) {
            return false
        }
        const selectYear = $(this).text();
        filter(selectYear);
        $(this).addClass('is-warning').siblings().removeClass('is-warning');
        if ($(this).hasClass('all')) {
            $('.select-year').show('slow');
        }

    });

    function filter(e) {
        const regex = new RegExp('\\b' + e + '\\b');
        $('.select-year').hide('slow').filter(function () {
            return regex.test($(this).data('year'))
        }).show('slow');
    }

// bulma modals --------------------------------------------------------------------------------------------------

const rootEl = document.documentElement;
const $modals = getAll('.modal');
const $modalButtons = getAll('.modal-button');
const $modalCloses = getAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button');

if ($modalButtons.length > 0) {
    $modalButtons.forEach(function ($el) {
        $el.addEventListener('click', function () {
            const target = $el.dataset.target;
            const $target = document.getElementById(target);
            rootEl.classList.add('is-clipped');
            $target.classList.add('is-active');
        });
    });
}

if ($modalCloses.length > 0) {
    $modalCloses.forEach(function ($el) {
        $el.addEventListener('click', function () {
            closeModals();
        });
    });
}

document.addEventListener('keydown', function (event) {
    const e = event || window.event;
    if (e.keyCode === 27) {
        closeModals();
    }
});

function closeModals() {
    rootEl.classList.remove('is-clipped');
    $modals.forEach(function ($el) {
        $el.classList.remove('is-active');
    });
}

// Functions

function getAll(selector) {
    return Array.prototype.slice.call(document.querySelectorAll(selector), 0);
}

    // scroll to anchor ----------------------------------------------------------------------------------------------

    $('a[href*="#"]')
    // Remove links that don't actually link to anything
        .not('[href="#"]')
        .not('[href="#0"]')
        .click(function(event) {
            // On-page links
            if (
                location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
                &&
                location.hostname == this.hostname
            ) {
                // Figure out element to scroll to
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                // Does a scroll target exist?
                if (target.length) {
                    // Only prevent default if animation is actually gonna happen
                    event.preventDefault();
                    $('html, body').animate({
                        scrollTop: target.offset().top
                    }, 1000, function() {
                        // Callback after animation
                        // Must change focus!
                        var $target = $(target);
                        $target.focus();
                        if ($target.is(":focus")) { // Checking if the target was focused
                            return false;
                        } else {
                            $target.focus(); // Set focus again
                        };
                    });
                }
            }
        });

    // animation show elements ---------------------------------------------------------------------------------------

    $.fn.extend({
        animateaddClass: function (animationName) {
            var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
            this.addClass('animated ' + animationName).one(animationEnd, function() {
                $(this).removeClass('animated ' + animationName);
            });
        }
    });

    // bulma hamburger ----------------------------------------------------------------------------------------------

    (function() {
        var burger = document.querySelector('.burger');
        var menu = document.querySelector('#'+burger.dataset.target);
        burger.addEventListener('click', function() {
            burger.classList.toggle('is-active');
            menu.classList.toggle('is-active');
        });
    })();

    // smooth page scroll ----------------------------------------------------------------------------------------------

    // $.event.props.push("wheelDelta");
    // $.easing.easeOutQuint = function (x, t, b, c, d) {
    //     return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
    // };
    //
    // var docH = $(document).height() - $(window).height(),
    //     scrollTop = $(window).scrollTop();
    //
    // $(document).on("DOMMouseScroll mousewheel", function (e, delta) {
    //
    //     // clamp the scroll offset
    //     scrollTop = Math.min(docH, Math.max(0, scrollTop - (delta || e.wheelDelta)));
    //
    //     $("body, html").stop().animate({
    //         scrollTop: scrollTop
    //     }, 1000, "easeOutQuint");
    //
    //     e.preventDefault();
    // });













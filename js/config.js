var prices = {
    // Предполагаемое количество уборок в год
    cleaningByCount: [
        { min: 1, max: 2, price: 1, ratio: 1.0 },
        { min: 3, max: 4, price: 1, ratio: 0.7 },
        { min: 5, max: null, price: 1, ratio: 0.5 }
    ],
    // Общая площадь офисного помещения
    cleaningBySpace: [
        { min: 1, max: 100, price: 60, ratio: 1.0 },
        { min: 101, max: 250, price: 40, ratio: 1.0 },
        { min: 251, max: null, price: 60, ratio: 1.0 },
    ],
    // Количество санузлов
    cleaningByBaths: [
        { min: 1, max: 5, price: 30, ratio: 1.0 },
        { min: 6, max: 10, price: 30, ratio: 1.2 },
        { min: 11, max: null, price: 30, ratio: 1.3 },
    ],
    // Количество окон
    cleaningWindows: [
        { min: 1, max: 15, price: 20, ratio: 1.0 },
        { min: 16, max: 40, price: 20, ratio: 1.2 },
        { min: 40, max: null, price: 20, ratio: 1.3 },
    ]
};

var services = [
    {
        name: 'Регулярная уборка офисных помещений',
        types: [
            {
                name: 'Генеральная уборка',
                options: [
                    { name: 'Предполагаемое количество уборок в год', type: prices.cleaningByCount },
                    { name: 'Общая площадь офисного помещения', type: prices.cleaningBySpace },
                    { name: 'Количество санузлов', type: prices.cleaningByBaths },
                    { name: 'Количество оконных проемов', type: prices.cleaningWindows }
                ]
            },
            {
                name: 'Утренняя ежедневная уборка',
                options: [
                    { name: 'Предполагаемое количество уборок в месяц', type: prices.cleaningByCount },
                    { name: 'Общая площадь офисного помещения', type: prices.cleaningBySpace },
                    { name: 'Количество санузлов', type: prices.cleaningByBaths }
                ]
            },
            {
                name: 'Ежедневная уборка в любое время',
                options: [
                    { name: 'Предполагаемое количество уборок в месяц', type: prices.cleaningByCount },
                    { name: 'Общая площадь офисного помещения', type: prices.cleaningBySpace },
                    { name: 'Количество санузлов', type: prices.cleaningByBaths }
                ]
            },
            {
                name: 'Мытье окон',
                options: [
                    { name: 'Количество одностворчатых окон', type: prices.cleaningWindows },
                    { name: 'Количество двустворчатых окон', type: prices.cleaningWindows },
                    { name: 'Количество трёхстворчатых окон', type: prices.cleaningWindows },
                    { name: 'Количество москитных сеток', type: prices.cleaningWindows },
                    { name: 'Количество балконных дверей', type: prices.cleaningWindows },
                    { name: 'Требуется автовышка', type: prices.cleaningWindows }
                ]
            },
            {
                name: 'Мытье витрин, фасадов, вывесок',
                options: [
                    { name: 'Площадь витрины', type: prices.cleaningWindows },
                    { name: 'Площадь фасадов', type: prices.cleaningWindows },
                    { name: 'Площадь вывесок', type: prices.cleaningWindows }
                ]
            }
        ]
    },
    {
        name: 'Уборка офисных помещений после ремонта',
        types: []
    }
];
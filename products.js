/* =========================================================
   OBI COSMETICS
   PRODUCT DATABASE
========================================================= */

const products = [


    /* =====================================================
       LIP GLOSS
    ===================================================== */

    {
        id: 1,

        name: "Lip Gloss",

        category: "lip-gloss",

        prices: {
    EGY: 180,
    UAE: 20,
    KSA: 20,
    QAT: 20
},

        image:
            "images/products/lip-gloss.webp",

        tagline: "",

        benefits: [],

        usage: "",

        description:
            "Glossy lip colour with a smooth finish.",

        shades: [

    {
        name: "Nude",
        color: "#C48778",

        
        lipImage:
            "images/shades/lip-gloss/nude.webp"
        
    },

    {
        name: "Nude Pink",
        color: "#D6949A",

        
        lipImage:
            "images/shades/lip-gloss/nude-pink.webp"
        
    },

    {
        name: "Rosewood",
        color: "#A85E61",

        
        lipImage:
            "images/shades/lip-gloss/rosewood.webp"
        
    },

    {
        name: "Hot Red",
        color: "#E31B23",

        
        lipImage:
            "images/shades/lip-gloss/hot-red.webp"
        
    },

    {
        name: "Chocolate",
        color: "#7A3E2E",

        
        lipImage:
            "images/shades/lip-gloss/chocolate.webp"
        
    },

    {
        name: "Femme",
        color: "#B64965",

        
        lipImage:
            "images/shades/lip-gloss/femme.webp"
        
    },

    {
        name: "Clear",
        color: "#F3E6E2",

        
        lipImage:
            "images/shades/lip-gloss/clear.webp"
        
    },

    {
        name: "Caramel",
        color: "#B8744F",

        
        lipImage:
            "images/shades/lip-gloss/caramel.webp"
        
    },

    {
        name: "Sweetheart",
        color: "#D85F7E",

        
        lipImage:
            "images/shades/lip-gloss/sweetheart.webp"
        
    },

    {
        name: "Milky Pink",
        color: "#F2B8C6",

        
        lipImage:
            "images/shades/lip-gloss/milky-pink.webp"
        
    },

    {
        name: "Pink",
        color: "#E77EA3",

        
        lipImage:
            "images/shades/lip-gloss/pink.webp"
        
    }

]
    },



    /* =====================================================
       LIP OIL
    ===================================================== */

    {
        id: 2,

        name: "Lip Oil",

        category: "lip-oil",

        prices: {
    EGY: 200,
    UAE: 25,
    KSA: 25,
    QAT: 25
},

        image:
            "images/products/lip-oil.webp",

        tagline: "",

        benefits: [],

        usage: "",

        description:
            "Lightweight lip oil for shine and moisture.",

        shades: [

    {
        name: "Cherry",

        color: "#8F183A",

        lipImage:
            "images/shades/lip-oil/cherry.webp"
    },

    {
        name: "Chocolate",

        color: "#7A3E2E",

        lipImage:
            "images/shades/lip-oil/chocolate.webp"
    },

    {
        name: "Glitter",

        color: "#F2E7DF",

        lipImage:
            "images/shades/lip-oil/glitter.webp"
    },

    {
        name: "Hot Red",

        color: "#cf0e0e",

        lipImage:
            "images/shades/lip-oil/hot-red.webp"
    },

    {
        name: "Pink",

        color: "#E98AA6",

        lipImage:
            "images/shades/lip-oil/pink.webp"
    },

    {
        name: "Watermelon",

        color: "#ff0022",

        lipImage:
            "images/shades/lip-oil/watermelon.webp"
    }

]
    },



    /* =====================================================
       BLUSH
    ===================================================== */

    {
        id: 3,

        name: "Blush",

        category: "blush",

       prices: {
    EGY: 320,
    UAE: 30,
    KSA: 30,
    QAT: 30
},

        image:
            "images/products/blush/blush.webp",
          tagline:
        "SILKY • BUILDABLE • LONG WEAR",

    benefits: [
        "Silky, smooth texture",
        "Buildable colour for a soft or more defined look",
        "Designed for long wear",
        "Easy to layer and blend"
    ],

    usage:
        "Apply a small amount to the cheeks and blend. Build gradually until you reach your preferred colour intensity.",

    description:
        "A silky, buildable blush made to bring soft, flattering colour to your cheeks with a comfortable long-wear finish.",

    netWeight:
        "5 g / 0.17 oz",

        shades: [

    {
        name: "Bella Pink",

        
color: "#F08AA3",
        lipImage:
            "images/shades/blush/bella-pink.webp"
    },

    {
        name: "Sweet Cheeks",
color: "#E61E6E",
       

        lipImage:
            "images/shades/blush/sweet-cheeks.webp"
    },

    {
        name: "Cherish",
color: "#F06F63",
        

        lipImage:
            "images/shades/blush/cherish.webp"
    },

    {
        name: "Coral Crush",

         color: "#F37A34",

        lipImage:
            "images/shades/blush/coral-crush.webp"
    }

]
    },



    /* =====================================================
       LIQUID LIPSTICK
    ===================================================== */

   {
    id: 4,

    name: "Liquid Lipstick",

    category: "liquid-lipstick",

   prices: {
    EGY: 250,
    UAE: 25,
    KSA: 25,
    QAT: 25
},

    image:
        "images/products/liquid-lipstick.webp",

    tagline:
        "MATTE • SMOOTH • BOLD",

    description:
        "Obi Cosmetics Liquid Matte Lipstick.",

    benefits: [],

    usage: "",

    /*showInShadeParade: false,*/

    shades: [

        {
            name: "M04 Wine",
            color: "#A20F2D",
            lipImage:
                "images/shades/liquid-lipstick/m04-wine.webp"
        },

        {
            name: "M13 Cinnamon",
            color: "#C66E5D",
            lipImage:
                "images/shades/liquid-lipstick/m13-cinnamon.webp"
        },

        {
            name: "M18 Vinyl",
            color: "#C72E65",
            lipImage:
                "images/shades/liquid-lipstick/m18-vinyl.webp"
        },

        {
            name: "M26 Gorgeous",
            color: "#D60059",
            lipImage:
                "images/shades/liquid-lipstick/m26-gorgeous.webp"
        },

        {
            name: "M33 Velvet Berry",
            color: "#8E1231",
            lipImage:
                "images/shades/liquid-lipstick/m33-velvet-berry.webp"
        },

        {
            name: "M37 Adel 19",
            color: "#B65F49",
            lipImage:
                "images/shades/liquid-lipstick/m37-adel-19.webp"
        }

    ]
},



    /* =====================================================
       BODY OIL
    ===================================================== */

    {
        id: 5,

        name: "Body Oil",

        category: "body-care",

        prices: {
    EGY: 320,
    UAE: 42,
    KSA: 45,
    QAT: 42
},

        image:
            "images/products/body-care/body-oil/body-oil.webp",
        tagline:
            "NOURISH • SOFTEN • GLOW",

        description:
            "A lightweight body oil designed to nourish the skin, help lock in moisture and leave the skin soft, silky and glowing.",

        benefits: [
            "Deeply nourishes the skin",
            "Helps lock in moisture",
            "Leaves skin soft & silky",
            "Enhances a healthy-looking glow",
            "Lightweight, smooth finish"
        ],

        usage:
            "Best used on damp skin after showering.",

        shades: []
    },



    /* =====================================================
       LIP LINER PENCIL
    ===================================================== */

    {
        id: 6,

        name: "Lip Liner Pencil",

        category: "lip-liner",

        prices: {
    EGY: 180,
    UAE: 20,
    KSA: 20,
    QAT: 20
},

        image:
            "images/products/lip-liner-pencil.webp",

        tagline:
            "DEFINE • SHAPE • PERFECT",

        description:
            "Classic pencil lip liner for precise definition.",

        benefits: [],

        usage: "",

        shades: [

            {
                name: "01 Nude",
                color: "#81331D"
            },

            {
                name: "02 Rose",
                color: "#BA0F89"
            },

            {
                name: "03 Pink",
                color: "#9E6524"
            },

            {
                name: "04 Mauve",
                color: "#9B6676"
            },

            {
                name: "05 Berry",
                color: "#35ECCB"
            }

        ]
    },



    /* =====================================================
       LIP LINER ROLL-UP
    ===================================================== */

    {
        id: 7,

        name: "Lip Liner Roll-Up",

        category: "lip-liner",

       prices: {
    EGY: 220,
    UAE: 25,
    KSA: 25,
    QAT: 25
},

        image:
            "images/products/lip-liner-rollup.webp",

        tagline:
            "DEFINE • SMOOTH • EASY",

        description:
            "Retractable lip liner with smooth application.",

        benefits: [],

        usage: "",
showInShadeParade: false,

shades: [

    {
        name: "#4",
        color: "#8D284D",
         lipImage:
            "images/shades/lip-liner-rollup/4.webp"
    },

    {
        name: "#10",
        color: "#765148",
         lipImage:
            "images/shades/lip-liner-rollup/10.webp"
    },

    {
        name: "#23",
        color: "#563025",
         lipImage:
            "images/shades/lip-liner-rollup/23.webp"
    }

]
    },



    /* =====================================================
       BODY BUTTER
    ===================================================== */

    {
        id: 8,

        name: "Body Butter",

        category: "body-care",

        prices: {
    EGY: 300,
    UAE: null,
    KSA: null,
    QAT: null
},

     image:
    "images/products/body-care/body-butter/body-butter.webp",
gallery: [

    {
        src:
            "images/products/body-care/body-butter/body-butter.webp",

        label:
            "Product",

        alt:
            "Obi Cosmetics Body Butter"
    },

    {
        src:
            "images/products/body-care/body-butter/body-butter-texture.webp",

        label:
            "Texture",

        alt:
            "Obi Cosmetics Body Butter texture"
    },

    {
        src:
            "images/products/body-care/body-butter/body-butter-on-skin.webp",

        label:
            "On Skin",

        alt:
            "Obi Cosmetics Body Butter applied on skin"
    }

],
        tagline:
            "DEEP MOISTURE • SOFTEN • NOURISH",

        description:
            "Rich body moisture designed for dry skin and areas that need extra nourishment.",

        benefits: [
            "Provides rich, long-lasting moisture",
            "Helps soften dry, rough skin",
            "Leaves skin smooth & supple",
            "Deeply nourishes the skin",
            "Helps maintain a soft, healthy-looking glow"
        ],

        usage:
            "Perfect for extra-dry areas and intensive moisture.",

        shades: []
    },



    /* =====================================================
       BODY LOTION
    ===================================================== */

    {
        id: 9,

        name: "Body Lotion",

        category: "body-care",

        prices: {
    EGY: 250,
    UAE: null,
    KSA: null,
    QAT: null
},
 image:
    "images/products/body-care/body-lotion/body-lotion.webp",

gallery: [

    {
        src:
            "images/products/body-care/body-lotion/body-lotion.webp",

        label:
            "Product",

        alt:
            "Obi Cosmetics Body Lotion"
    },

    {
        src:
            "images/products/body-care/body-lotion/body-lotion-back.webp",

        label:
            "Details",

        alt:
            "Obi Cosmetics Body Lotion product details"
    }

],
       tagline:
        "DEEP HYDRATION • SOFT & SMOOTH SKIN • LONG-LASTING MOISTURE",

    benefits: [
        "Helps deeply hydrate the skin",
        "Leaves skin feeling soft and smooth",
        "Provides long-lasting moisture",
        "Formulated with Urea for added hydration"
    ],

    usage:
        "Apply to clean skin and massage gently until absorbed. For extra nourishment, follow with Obi Body Butter.",

    description:
        "A nourishing body lotion with Urea designed to deeply hydrate and leave your skin soft, smooth and healthy-looking.",

    volume:
        "300 ml",

    origin:
        "Made in Egypt",

        shades: []
    },



    /* =====================================================
       HAIR CREAM
    ===================================================== */

    {
        id: 10,

        name: "Hair Cream",

        category: "hair-care",

       prices: {
    EGY: 350,
    UAE: 60,
    KSA: 60,
    QAT: 60
},

       image:
    "images/products/hair-care/hair-cream.webp",

        tagline:
            "NOURISH • SOFTEN • SMOOTH",

        description:
            "A nourishing hair cream designed to moisturize and soften dry hair, leaving it smoother, more manageable and beautifully conditioned without weighing it down.",

        benefits: [
            "Helps nourish & moisturize dry hair",
            "Softens and smooths the hair",
            "Helps reduce the look of frizz",
            "Improves manageability",
            "Leaves hair feeling soft and conditioned",
            "Adds a healthy-looking shine"
        ],

        usage:
            "Apply a small amount through the lengths and ends of the hair. Style as desired.",

        shades: []
    },



    /* =====================================================
       HAIR OIL
    ===================================================== */

    {
        id: 11,

        name: "Hair Oil",

        category: "hair-care",

        prices: {
    EGY: 350,
    UAE: 50,
    KSA: 50,
    QAT: 50
},

        image:
            "images/products/hair-care/hair-oil.webp",

        tagline:
            "GROW • STRENGTHEN • NOURISH",

        description:
            "A nourishing scalp and hair oil designed to support stronger, healthier-looking hair.",

        benefits: [
            "Supports healthy hair growth",
            "Nourishes the scalp & roots",
            "Helps strengthen hair",
            "Helps reduce breakage",
            "Promotes longer, healthier-looking hair"
        ],

        usage:
            "Massage into scalp and roots. Leave for 1–1½ hours, then wash thoroughly with shampoo.",

        shades: []
    }

];
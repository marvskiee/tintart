import { IoShirtSharp } from "react-icons/io"
const DATA = {
    PESO: "₱",
    ADMIN: {
        HEADER_LINKS: [
            { name: 'dashboard', link: '/admin/dashboard' },
            { name: 'properties', link: '/admin/properties' },
            { name: 'categories', link: '/admin/categories' },
            { name: 'products', link: '/admin/products' },
            { name: 'orders', link: '/admin/orders' },
            { name: 'users', link: '/admin/users' },
            { name: 'settings', link: '/admin/settings/shop' },
        ],
        SETTING_LINKS: [
            { name: 'shop settings', link: '/admin/settings/shop' },
            { name: 'edit profile', link: '/admin/settings/profile' },
            { name: 'change password', link: '/admin/settings/password' },
        ]
    },
    PAYMENT_METHOD: [
        {
            title:"Credit/Debit Card",
            logo: "https://cdn.visa.com/v2/assets/images/logos/visa/blue/logo.png",
            method:"credit"
        },
        {
            title:"Gcash",
            logo: "https://www.gcash.com/wp-content/uploads/2019/09/gcash-text-logo.png",
            method:"gcash"
        },
        {
            title:"Cash on Delivery",
            method:"cod"
        },
    ],
    FOOTER:
    {
        ADDRESS: "37 Magiliw St.Lena Subdivision, Dalandanan, Valenzuela City",
        CONTACT: "(+63) 9123456789",
        EMAIL: "sample@gmail.com",
        LINKS: [
            { name: 'home', link: '/' },
            { name: 'shop', link: '/shop' },
            { name: 'gallery', link: '/gallery' },
            { name: 'faqs', link: '/faqs' },
            { name: 'about us', link: '/about' },
        ],
        FOLLOWUS:
            [
                { name: 'Facebook', link: '/about' },
                { name: 'TikTok', link: '/about' },
            ]
    },
    FEATURED_PROJECT: [
        {
            title: "Death Bed",
            image: "./images/featured-products/FP (1).jpg",
            price: 499
        },
        {
            title: "Blinding Lights",
            image: "./images/featured-products/FP (2).jpg",
            price: 599
        },
        {
            title: "Peaches",
            image: "./images/featured-products/FP (3).jpg",
            price: 699
        },
        {
            title: "Butter",
            image: "./images/featured-products/FP (4).jpg",
            price: 399
        },
        {
            title: "Easy On Me",
            image: "./images/featured-products/FP (5).jpg",
            price: 699
        }
    ],
    ABOUT: [
        {
            role: "Artist",
            first_name: "Lorem",
            last_name: "Ipsum",
            social_media_links: [
                "/",
                "/",
                "/"
            ], image: "../images/about1.png"

        },
        {
            role: "Merchant",
            first_name: "Lorem",
            last_name: "Ipsum",
            social_media_links: [
                "/",
                "/",
                "/"
            ], image: "../images/about1.png"
        },
        {
            role: "Artist",
            first_name: "Lorem",
            last_name: "Ipsum",
            social_media_links: [
                "/",
                "/",
                "/"
            ], image: "../images/about1.png"

        },

    ],
    TABLE_HEADERS: {
        PROPERTIES: [
            { label: "Merchandise", name: "merchandise" },
            { label: "Values", name: "values" },
            { label: "Date Added", name: "created_at" }],
        USERS: [
            { label: "Name", name: "name" },
            { label: "Email", name: "email" },
            { label: "Type", name: "role" },
            { label: "Date Added", name: "created_at" }],
        CATEGORIES: [
            { label: "Categories", name: "category" },
            { label: "Date Added", name: "created_at" }],
        ORDERS: [
            { label: "Order ID", name: "order_id" },
            { label: "Name", name: "name" },
            { label: "Contact No.", name: "contact_no" },
            { label: "Address", name: "address" },
            { label: "Total Price", name: "total_price" },
            { label: "Paid", name: "is_paid" },
            { label: "Status", name: "status" },
        ],
        PRODUCTS: [
            { label: "Name", name: "product_name" },
            { label: "Featured", name: "is_featured" },
            { label: "Archived", name: "is_archived" },
            { label: "Sold Out", name: "is_sold_out" },
            { label: "Price", name: "price" },
            { label: "Merchandise", name: "merchandise" },
            { label: "Size", name: "sizes" },
            { label: "Color", name: "colors" },
            { label: "Date Added", name: "created_at" }
        ],
    },
    DROPDOWN_GRAPH: ["Weekly", "Monthly", "Daily"],
    FAQS: [{
        topic: "Orders",
        sub_topic: [
            {
                title: "Placing an Order",
                QA: [
                    {
                        question: "What should I check before placing an order?",
                        answer: "Always check the product details, and the variation of the product that you wish to checkout."
                    },
                    {
                        question: "How do I remove an item in my shopping cart?",
                        answer: "To remove an item from your cart, go to your cart(located at the upper right), and click the trash icon beside the product you wish to remove."
                    },
                ]
            },
            {
                title: "Order Cancellation",
                QA: [
                    {
                        question: "Is there any way I could cancel my order?",
                        answer: `Yes! You can cancel your order by going to your profile and clicking “Cancel Order” on the order you wish to cancel.
                        NOTE: Cancellation is only accepted if your order is still NOT paid.This is to avoid confusion regarding refunds between the seller and the buyer.`
                    },
                    {
                        question: "Why was my order cancelled?",
                        answer: "This is due to our system cancelling orders that have still not been paid within 3 days after placing the order.You may order again and make sure that the order is paid within that certain amount of time."
                    },
                ]
            }
        ],

    },
    {
        topic: "Payment",
        sub_topic: [
            {
                title: "Payment Process",
                QA: [
                    {
                        question: "How should I send the payment?",
                        answer: "After placing your order and choosing from the payment methods listed, an invoice will be sent to your email together with the details on where you should send your payment.Take note that a cancellation will occur on the third day if the order is still not paid."
                    },
                ]
            },
        ]
    },
    {
        topic: "Shipping and Delivery",
        sub_topic: [
            {
                title: "Shipping FAQ",
                QA: [
                    {
                        question: "What are the shipping fees and rates ?",
                        answer: "The shipping fee may depend on the location of the buyer and the third - party courier that the seller will book.The seller will first inform the buyer of the shipping fee before they ship the order."
                    },
                ]
            },
            {
                title: "Delivery FAQ",
                QA: [
                    {
                        question: "Do you deliver during weekends and / or holidays ?",
                        answer: "Absolutely! However, it also depends on courier availability and the weather as we care about the quality and state of the products that you’ve ordered and the well - being of the delivery riders."
                    },
                    {
                        question: "How do I change my shipping address?",
                        answer: "Before placing an order, an overview of the order details will be displayed, together with the shipping address.You may edit it by clicking “Edit” or by going to your profile and “Edit Shipping Address” and filling out the fields needed."
                    },
                ]
            },
        ]
    },
    {
        topic: "Customization",
        sub_topic: [
            {
                title: "What is Customization Feature",
                QA: [
                    {
                        question: "What is customization?",
                        answer: "Customization refers to the ability to personalize and tailor products such t - shirts, sintra boards, and photocards according to your preferences, designs, or branding."
                    },
                    {
                        question: "How can I access the customization feature on this website?",
                        answer: "You may access the customization feature by clicking “Start Customizing” in the Homepage of the website, or by going to a product and clicking “Create your own design”."
                    },
                    {
                        question: "What are the available customization options ?",
                        answer: "Our customization options typically include choosing colors and elements, adding text, uploading images, selecting fonts, and adjusting the size and placement of designs.The specific customization features may vary depending on the product."
                    },
                    {
                        question: "What types of merchandise can I customize on this website ?",
                        answer: "We offer customization on t - shirts, photocards and sintra boards"
                    },
                    {
                        question: "Can I use my own designs for customization ?",
                        answer: "Absolutely! You can upload your own designs, logos, or artwork to personalize your merchandise.Our design tools make it easy to apply your creativity and make each item your own."
                    },
                    {
                        question: "Are there any restrictions on the designs I can use ?",
                        answer: "While we encourage creativity, we do have guidelines and restrictions on using offensive materials.We are not encouraging customers to create any sexual or offensive content."
                    },
                ]
            },
            {
                title: "Saving and Export",
                QA: [
                    {
                        question: "I still haven’t finished editing my work.Can I save it ?",
                        answer: "Yes! You may click “Save Custom Print” to save your draft.To access your past works, you may click the arrow beside it, and your list of works should appear."
                    },
                    {
                        question: "Can I export my work as an Image ?",
                        answer: "Yes, by clicking “Download” on the lower right of the page."
                    },
                ]
            }
        ]
    },
    {
        topic: "Product Quality",
        sub_topic: [
            {
                title: "T - Shirts",
                QA: [
                    {
                        question: "What materials are used for the t-shirts?",
                        answer: "We use high-quality, flexible materials suitable for clothing, ensuring comfort and durability. The shirt is made of Thick Cotton Blend Fabric (200 GSM). The materials are carefully selected to provide a soft and breathable finish on your T-shirt."
                    },
                    {
                        question: "How durable are the prints on the customized t-shirts?",
                        answer: "Our printing process ensures durable and vibrant prints that withstand regular washing and wear. Follow the care instructions provided to maintain the longevity of the print."
                    },
                ]
            },
            {
                title: "Photocards",
                QA: [
                    {
                        question: "What kind of finish do the photocards have?",
                        answer: "Our photocards have a high-quality finish for a professional look. You can choose between glossy or matte finishes based on your preference."
                    },
                ]
            },
            {
                title: "Sintra Boards",
                QA: [
                    {
                        question: "Is Sintra board suitable for outdoor use?",
                        answer: "Yes, Sintra board is well-suited for outdoor use. It's durable and weather-resistant, making it a great choice for outdoor signage and displays."
                    },
                ]
            }
        ]
    },
    {
        topic: "Gallery",
        sub_topic: [
            {
                title: "What is Gallery?",
                QA: [
                    {
                        question: "What does the gallery display?",
                        answer: "The gallery displays images and commissions created by two curated artists that are connected to TintArt."
                    },
                ]
            },
        ]
    },
    {
        topic: "Contact Us",
        sub_topic: [
            {
                title: "How contact works?",
                QA: [
                    {
                        question: "How do I contact the seller?",
                        answer: "The gallery displays images and commissions created by two curated artists that are connected to TintArt."
                    },
                ]
            },
        ]
    }
    ]
}

export default DATA;
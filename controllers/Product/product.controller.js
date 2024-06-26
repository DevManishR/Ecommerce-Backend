import {
  ErrorResponse,
  successResponse,
  successResponseWithData,
} from "../../helpers/apiResponse.js";
import productModel from "../../models/Product/product.model.js";

export const Createproduct = async (req, res) => {
  try {
    const { title, description, price, stock, category } = req.body;

    console.log(title, description, price, stock, category )

    
    const uploadedImages = req.files ? req.files.map((file) => file.path) : [];

    console.log("imagesfiles",req.files)
    

    const checkDuplicateName = await productModel.findOne({ title });

    if (checkDuplicateName) {
      return ErrorResponse(res, "Product with same name  already exists");
    }

    const product = await new productModel({
      title,
      description,
      price,
      stock,
      category,
      images: uploadedImages,
    }).save();
    return successResponseWithData(res, "Product Created Sucessfully", product);

    
  } catch (error) {}
};

export const GetAllproduct = async (req, res) => {
  try {
    const allProducts = await productModel.find({}).sort({ createdAt: -1 });
   // console.log("asa",allProducts)

    return successResponseWithData(res, "Products List", allProducts);
  } catch (error) {
    console.log(error);
    return ErrorResponse(res, "Error searching for Products: " + error.message);
  }
};


/*
export const AddMultipleProduct = async (req, res) => {
  const { data } = req.body;

  const allData = [
    {
      title: 'iPhone 9',
      description: 'An apple mobile which is nothing like apple',
      price: 549,
      rating: 4.69,
      stock: 94,
      category: 'smartphones',
      images: [
        'https://cdn.dummyjson.com/product-images/1/1.jpg',
        'https://cdn.dummyjson.com/product-images/1/2.jpg',
        'https://cdn.dummyjson.com/product-images/1/3.jpg',
        'https://cdn.dummyjson.com/product-images/1/4.jpg',
        'https://cdn.dummyjson.com/product-images/1/thumbnail.jpg'
      ]
    },
    {
      title: 'iPhone X',
      description: 'SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...',
      price: 899,
      rating: 4.44,
      stock: 34,
      category: 'smartphones',
      images: [
        'https://cdn.dummyjson.com/product-images/2/1.jpg',
        'https://cdn.dummyjson.com/product-images/2/2.jpg',
        'https://cdn.dummyjson.com/product-images/2/3.jpg',
        'https://cdn.dummyjson.com/product-images/2/thumbnail.jpg'
      ]
    },
    {
      title: 'Samsung Universe 9',
      description: "Samsung's new variant which goes beyond Galaxy to the Universe",
      price: 1249,
      rating: 4.09,
      stock: 36,
      category: 'smartphones',
      images: [ 'https://cdn.dummyjson.com/product-images/3/1.jpg' ]
    },
    {
      title: 'OPPOF19',
      description: 'OPPO F19 is officially announced on April 2021.',
      price: 280,
      rating: 4.3,
      stock: 123,
      category: 'smartphones',
      images: [
        'https://cdn.dummyjson.com/product-images/4/1.jpg',
        'https://cdn.dummyjson.com/product-images/4/2.jpg',
        'https://cdn.dummyjson.com/product-images/4/3.jpg',
        'https://cdn.dummyjson.com/product-images/4/4.jpg',
        'https://cdn.dummyjson.com/product-images/4/thumbnail.jpg'
      ]
    },
    {
      title: 'Huawei P30',
      description: 'Huawei’s re-badged P30 Pro New Edition was officially unveiled yesterday in Germany and now the device has made its way to the UK.',
      price: 499,
      rating: 4.09,
      stock: 32,
      category: 'smartphones',
      images: [
        'https://cdn.dummyjson.com/product-images/5/1.jpg',
        'https://cdn.dummyjson.com/product-images/5/2.jpg',
        'https://cdn.dummyjson.com/product-images/5/3.jpg'
      ]
    },
    {
      title: 'MacBook Pro',
      description: 'MacBook Pro 2021 with mini-LED display may launch between September, November',
      price: 1749,
      rating: 4.57,
      stock: 83,
      category: 'laptops',
      images: [
        'https://cdn.dummyjson.com/product-images/6/1.png',
        'https://cdn.dummyjson.com/product-images/6/2.jpg',
        'https://cdn.dummyjson.com/product-images/6/3.png',
        'https://cdn.dummyjson.com/product-images/6/4.jpg'
      ]
    },
    {
      title: 'Samsung Galaxy Book',
      description: 'Samsung Galaxy Book S (2020) Laptop With Intel Lakefield Chip, 8GB of RAM Launched',
      price: 1499,
      rating: 4.25,
      stock: 50,
      category: 'laptops',
      images: [
        'https://cdn.dummyjson.com/product-images/7/1.jpg',
        'https://cdn.dummyjson.com/product-images/7/2.jpg',
        'https://cdn.dummyjson.com/product-images/7/3.jpg',
        'https://cdn.dummyjson.com/product-images/7/thumbnail.jpg'
      ]
    },
    {
      title: 'Microsoft Surface Laptop 4',
      description: 'Style and speed. Stand out on HD video calls backed by Studio Mics. Capture ideas on the vibrant touchscreen.',
      price: 1499,
      rating: 4.43,
      stock: 68,
      category: 'laptops',
      images: [
        'https://cdn.dummyjson.com/product-images/8/1.jpg',
        'https://cdn.dummyjson.com/product-images/8/2.jpg',
        'https://cdn.dummyjson.com/product-images/8/3.jpg',
        'https://cdn.dummyjson.com/product-images/8/4.jpg',
        'https://cdn.dummyjson.com/product-images/8/thumbnail.jpg'
      ]
    },
    {
      title: 'Infinix INBOOK',
      description: 'Infinix Inbook X1 Ci3 10th 8GB 256GB 14 Win10 Grey – 1 Year Warranty',
      price: 1099,
      rating: 4.54,
      stock: 96,
      category: 'laptops',
      images: [
        'https://cdn.dummyjson.com/product-images/9/1.jpg',
        'https://cdn.dummyjson.com/product-images/9/2.png',
        'https://cdn.dummyjson.com/product-images/9/3.png',
        'https://cdn.dummyjson.com/product-images/9/4.jpg',
        'https://cdn.dummyjson.com/product-images/9/thumbnail.jpg'
      ]
    },
    {
      title: 'HP Pavilion 15-DK1056WM',
      description: 'HP Pavilion 15-DK1056WM Gaming Laptop 10th Gen Core i5, 8GB, 256GB SSD, GTX 1650 4GB, Windows 10',
      price: 1099,
      rating: 4.43,
      stock: 89,
      category: 'laptops',
      images: [
        'https://cdn.dummyjson.com/product-images/10/1.jpg',
        'https://cdn.dummyjson.com/product-images/10/2.jpg',
        'https://cdn.dummyjson.com/product-images/10/3.jpg',
        'https://cdn.dummyjson.com/product-images/10/thumbnail.jpeg'
      ]
    },
    {
      title: 'perfume Oil',
      description: 'Mega Discount, Impression of Acqua Di Gio by GiorgioArmani concentrated attar perfume Oil',
      price: 13,
      rating: 4.26,
      stock: 65,
      category: 'fragrances',
      images: [
        'https://cdn.dummyjson.com/product-images/11/1.jpg',
        'https://cdn.dummyjson.com/product-images/11/2.jpg',
        'https://cdn.dummyjson.com/product-images/11/3.jpg',
        'https://cdn.dummyjson.com/product-images/11/thumbnail.jpg'
      ]
    },
    {
      title: 'Brown Perfume',
      description: 'Royal_Mirage Sport Brown Perfume for Men & Women - 120ml',
      price: 40,
      rating: 4,
      stock: 52,
      category: 'fragrances',
      images: [
        'https://cdn.dummyjson.com/product-images/12/1.jpg',
        'https://cdn.dummyjson.com/product-images/12/2.jpg',
        'https://cdn.dummyjson.com/product-images/12/3.png',
        'https://cdn.dummyjson.com/product-images/12/4.jpg',
        'https://cdn.dummyjson.com/product-images/12/thumbnail.jpg'
      ]
    },
    {
      title: 'Fog Scent Xpressio Perfume',
      description: 'Product details of Best Fog Scent Xpressio Perfume 100ml For Men cool long lasting perfumes for Men',
      price: 13,
      rating: 4.59,
      stock: 61,
      category: 'fragrances',
      images: [
        'https://cdn.dummyjson.com/product-images/13/1.jpg',
        'https://cdn.dummyjson.com/product-images/13/2.png',
        'https://cdn.dummyjson.com/product-images/13/3.jpg',
        'https://cdn.dummyjson.com/product-images/13/4.jpg',
        'https://cdn.dummyjson.com/product-images/13/thumbnail.webp'
      ]
    },
    {
      title: 'Non-Alcoholic Concentrated Perfume Oil',
      description: 'Original Al Munakh® by Mahal Al Musk | Our Impression of Climate | 6ml Non-Alcoholic Concentrated Perfume Oil',
      price: 120,
      rating: 4.21,
      stock: 114,
      category: 'fragrances',
      images: [
        'https://cdn.dummyjson.com/product-images/14/1.jpg',
        'https://cdn.dummyjson.com/product-images/14/2.jpg',
        'https://cdn.dummyjson.com/product-images/14/3.jpg',
        'https://cdn.dummyjson.com/product-images/14/thumbnail.jpg'
      ]
    },
    {
      title: 'Eau De Perfume Spray',
      description: 'Genuine  Al-Rehab spray perfume from UAE/Saudi Arabia/Yemen High Quality',
      price: 30,
      rating: 4.7,
      stock: 105,
      category: 'fragrances',
      images: [
        'https://cdn.dummyjson.com/product-images/15/1.jpg',
        'https://cdn.dummyjson.com/product-images/15/2.jpg',
        'https://cdn.dummyjson.com/product-images/15/3.jpg',
        'https://cdn.dummyjson.com/product-images/15/4.jpg',
        'https://cdn.dummyjson.com/product-images/15/thumbnail.jpg'
      ]
    },
    {
      title: 'Hyaluronic Acid Serum',
      description: "L'OrÃ©al Paris introduces Hyaluron Expert Replumping Serum formulated with 1.5% Hyaluronic Acid",
      price: 19,
      rating: 4.83,
      stock: 110,
      category: 'skincare',
      images: [
        'https://cdn.dummyjson.com/product-images/16/1.png',
        'https://cdn.dummyjson.com/product-images/16/2.webp',
        'https://cdn.dummyjson.com/product-images/16/3.jpg',
        'https://cdn.dummyjson.com/product-images/16/4.jpg',
        'https://cdn.dummyjson.com/product-images/16/thumbnail.jpg'
      ]
    },
    {
      title: 'Tree Oil 30ml',
      description: 'Tea tree oil contains a number of compounds, including terpinen-4-ol, that have been shown to kill certain bacteria,',
      price: 12,
      rating: 4.52,
      stock: 78,
      category: 'skincare',
      images: [
        'https://cdn.dummyjson.com/product-images/17/1.jpg',
        'https://cdn.dummyjson.com/product-images/17/2.jpg',
        'https://cdn.dummyjson.com/product-images/17/3.jpg',
        'https://cdn.dummyjson.com/product-images/17/thumbnail.jpg'
      ]
    },
    {
      title: 'Oil Free Moisturizer 100ml',
      description: 'Dermive Oil Free Moisturizer with SPF 20 is specifically formulated with ceramides, hyaluronic acid & sunscreen.',
      price: 40,
      rating: 4.56,
      stock: 88,
      category: 'skincare',
      images: [
        'https://cdn.dummyjson.com/product-images/18/1.jpg',
        'https://cdn.dummyjson.com/product-images/18/2.jpg',
        'https://cdn.dummyjson.com/product-images/18/3.jpg',
        'https://cdn.dummyjson.com/product-images/18/4.jpg',
        'https://cdn.dummyjson.com/product-images/18/thumbnail.jpg'
      ]
    },
    {
      title: 'Skin Beauty Serum.',
      description: 'Product name: rorec collagen hyaluronic acid white face serum riceNet weight: 15 m',
      price: 46,
      rating: 4.42,
      stock: 54,
      category: 'skincare',
      images: [
        'https://cdn.dummyjson.com/product-images/19/1.jpg',
        'https://cdn.dummyjson.com/product-images/19/2.jpg',
        'https://cdn.dummyjson.com/product-images/19/3.png',
        'https://cdn.dummyjson.com/product-images/19/thumbnail.jpg'
      ]
    },
    {
      title: 'Freckle Treatment Cream- 15gm',
      description: "Fair & Clear is Pakistan's only pure Freckle cream which helpsfade Freckles, Darkspots and pigments. Mercury level is 0%, so there are no side effects.",
      price: 70,
      rating: 4.06,
      stock: 140,
      category: 'skincare',
      images: [
        'https://cdn.dummyjson.com/product-images/20/1.jpg',
        'https://cdn.dummyjson.com/product-images/20/2.jpg',
        'https://cdn.dummyjson.com/product-images/20/3.jpg',
        'https://cdn.dummyjson.com/product-images/20/4.jpg',
        'https://cdn.dummyjson.com/product-images/20/thumbnail.jpg'
      ]
    },
    {
      title: '- Daal Masoor 500 grams',
      description: 'Fine quality Branded Product Keep in a cool and dry place',
      price: 20,
      rating: 4.44,
      stock: 133,
      category: 'groceries',
      images: [
        'https://cdn.dummyjson.com/product-images/21/1.png',
        'https://cdn.dummyjson.com/product-images/21/2.jpg',
        'https://cdn.dummyjson.com/product-images/21/3.jpg'
      ]
    },
    {
      title: 'Elbow Macaroni - 400 gm',
      description: 'Product details of Bake Parlor Big Elbow Macaroni - 400 gm',
      price: 14,
      rating: 4.57,
      stock: 146,
      category: 'groceries',
      images: [
        'https://cdn.dummyjson.com/product-images/22/1.jpg',
        'https://cdn.dummyjson.com/product-images/22/2.jpg',
        'https://cdn.dummyjson.com/product-images/22/3.jpg'
      ]
    },
    {
      title: 'Orange Essence Food Flavou',
      description: 'Specifications of Orange Essence Food Flavour For Cakes and Baking Food Item',
      price: 14,
      rating: 4.85,
      stock: 26,
      category: 'groceries',
      images: [
        'https://cdn.dummyjson.com/product-images/23/1.jpg',
        'https://cdn.dummyjson.com/product-images/23/2.jpg',
        'https://cdn.dummyjson.com/product-images/23/3.jpg',
        'https://cdn.dummyjson.com/product-images/23/4.jpg',
        'https://cdn.dummyjson.com/product-images/23/thumbnail.jpg'
      ]
    },
    {
      title: 'cereals muesli fruit nuts',
      description: 'original fauji cereal muesli 250gm box pack original fauji cereals muesli fruit nuts flakes breakfast cereal break fast faujicereals cerels cerel foji fouji',
      price: 46,
      rating: 4.94,
      stock: 113,
      category: 'groceries',
      images: [
        'https://cdn.dummyjson.com/product-images/24/1.jpg',
        'https://cdn.dummyjson.com/product-images/24/2.jpg',
        'https://cdn.dummyjson.com/product-images/24/3.jpg',
        'https://cdn.dummyjson.com/product-images/24/4.jpg',
        'https://cdn.dummyjson.com/product-images/24/thumbnail.jpg'
      ]
    },
    {
      title: 'Gulab Powder 50 Gram',
      description: 'Dry Rose Flower Powder Gulab Powder 50 Gram • Treats Wounds',
      price: 70,
      rating: 4.87,
      stock: 47,
      category: 'groceries',
      images: [
        'https://cdn.dummyjson.com/product-images/25/1.png',
        'https://cdn.dummyjson.com/product-images/25/2.jpg',
        'https://cdn.dummyjson.com/product-images/25/3.png',
        'https://cdn.dummyjson.com/product-images/25/4.jpg',
        'https://cdn.dummyjson.com/product-images/25/thumbnail.jpg'
      ]
    },
    {
      title: 'Plant Hanger For Home',
      description: 'Boho Decor Plant Hanger For Home Wall Decoration Macrame Wall Hanging Shelf',
      price: 41,
      rating: 4.08,
      stock: 131,
      category: 'home-decoration',
      images: [
        'https://cdn.dummyjson.com/product-images/26/1.jpg',
        'https://cdn.dummyjson.com/product-images/26/2.jpg',
        'https://cdn.dummyjson.com/product-images/26/3.jpg',
        'https://cdn.dummyjson.com/product-images/26/4.jpg',
        'https://cdn.dummyjson.com/product-images/26/5.jpg',
        'https://cdn.dummyjson.com/product-images/26/thumbnail.jpg'
      ]
    },
    {
      title: 'Flying Wooden Bird',
      description: 'Package Include 6 Birds withAdhesive Tape Shape: 3D Shaped Wooden Birds Material: Wooden MDF, Laminated 3.5mm',
      price: 51,
      rating: 4.41,
      stock: 17,
      category: 'home-decoration',
      images: [
        'https://cdn.dummyjson.com/product-images/27/1.jpg',
        'https://cdn.dummyjson.com/product-images/27/2.jpg',
        'https://cdn.dummyjson.com/product-images/27/3.jpg',
        'https://cdn.dummyjson.com/product-images/27/4.jpg',
        'https://cdn.dummyjson.com/product-images/27/thumbnail.webp'
      ]
    },
    {
      title: '3D Embellishment Art Lamp',
      description: '3D led lamp sticker Wall sticker 3d wall art light on/off button  cell operated (included)',
      price: 20,
      rating: 4.82,
      stock: 54,
      category: 'home-decoration',
      images: [
        'https://cdn.dummyjson.com/product-images/28/1.jpg',
        'https://cdn.dummyjson.com/product-images/28/2.jpg',
        'https://cdn.dummyjson.com/product-images/28/3.png',
        'https://cdn.dummyjson.com/product-images/28/4.jpg',
        'https://cdn.dummyjson.com/product-images/28/thumbnail.jpg'
      ]
    },
    {
      title: 'Handcraft Chinese style',
      description: 'Handcraft Chinese style art luxury palace hotel villa mansion home decor ceramic vase with brass fruit plate',
      price: 60,
      rating: 4.44,
      stock: 7,
      category: 'home-decoration',
      images: [
        'https://cdn.dummyjson.com/product-images/29/1.jpg',
        'https://cdn.dummyjson.com/product-images/29/2.jpg',
        'https://cdn.dummyjson.com/product-images/29/3.webp',
        'https://cdn.dummyjson.com/product-images/29/4.webp',
        'https://cdn.dummyjson.com/product-images/29/thumbnail.webp'
      ]
    },
    {
      title: 'Key Holder',
      description: 'Attractive DesignMetallic materialFour key hooksReliable & DurablePremium Quality',
      price: 30,
      rating: 4.92,
      stock: 54,
      category: 'home-decoration',
      images: [
        'https://cdn.dummyjson.com/product-images/30/1.jpg',
        'https://cdn.dummyjson.com/product-images/30/2.jpg',
        'https://cdn.dummyjson.com/product-images/30/3.jpg',
        'https://cdn.dummyjson.com/product-images/30/thumbnail.jpg'
      ]
    },
    {
      title: 'Mornadi Velvet Bed',
      description: 'Mornadi Velvet Bed Base with Headboard Slats Support Classic Style Bedroom Furniture Bed Set',
      price: 40,
      rating: 4.16,
      stock: 140,
      category: 'furniture',
      images: [
        'https://cdn.dummyjson.com/product-images/31/1.jpg',
        'https://cdn.dummyjson.com/product-images/31/2.jpg',
        'https://cdn.dummyjson.com/product-images/31/3.jpg',
        'https://cdn.dummyjson.com/product-images/31/4.jpg',
        'https://cdn.dummyjson.com/product-images/31/thumbnail.jpg'
      ]
    },
    {
      title: 'Sofa for Coffe Cafe',
      description: 'Ratttan Outdoor furniture Set Waterproof  Rattan Sofa for Coffe Cafe',
      price: 50,
      rating: 4.74,
      stock: 30,
      category: 'furniture',
      images: [
        'https://cdn.dummyjson.com/product-images/32/1.jpg',
        'https://cdn.dummyjson.com/product-images/32/2.jpg',
        'https://cdn.dummyjson.com/product-images/32/3.jpg',
        'https://cdn.dummyjson.com/product-images/32/thumbnail.jpg'
      ]
    },
    {
      title: '3 Tier Corner Shelves',
      description: '3 Tier Corner Shelves | 3 PCs Wall Mount Kitchen Shelf | Floating Bedroom Shelf',
      price: 700,
      rating: 4.31,
      stock: 106,
      category: 'furniture',
      images: [
        'https://cdn.dummyjson.com/product-images/33/1.jpg',
        'https://cdn.dummyjson.com/product-images/33/2.jpg',
        'https://cdn.dummyjson.com/product-images/33/3.jpg',
        'https://cdn.dummyjson.com/product-images/33/4.jpg',
        'https://cdn.dummyjson.com/product-images/33/thumbnail.jpg'
      ]
    },
    {
      title: 'Plastic Table',
      description: 'V﻿ery good quality plastic table for multi purpose now in reasonable price',
      price: 50,
      rating: 4.01,
      stock: 136,
      category: 'furniture',
      images: [
        'https://cdn.dummyjson.com/product-images/34/1.jpg',
        'https://cdn.dummyjson.com/product-images/34/2.jpg',
        'https://cdn.dummyjson.com/product-images/34/3.jpg',
        'https://cdn.dummyjson.com/product-images/34/4.jpg',
        'https://cdn.dummyjson.com/product-images/34/thumbnail.jpg'
      ]
    },
    {
      title: '3 DOOR PORTABLE',
      description: 'Material: Stainless Steel and Fabric  Item Size: 110 cm x 45 cm x 175 cm Package Contents: 1 Storage Wardrobe',
      price: 41,
      rating: 4.06,
      stock: 68,
      category: 'furniture',
      images: [
        'https://cdn.dummyjson.com/product-images/35/1.jpg',
        'https://cdn.dummyjson.com/product-images/35/2.jpg',
        'https://cdn.dummyjson.com/product-images/35/3.jpg',
        'https://cdn.dummyjson.com/product-images/35/4.jpg',
        'https://cdn.dummyjson.com/product-images/35/thumbnail.jpg'
      ]
    },
    {
      title: 'Sleeve Shirt Womens',
      description: 'Cotton Solid Color Professional Wear Sleeve Shirt Womens Work Blouses Wholesale Clothing Casual Plain Custom Top OEM Customized',
      price: 90,
      rating: 4.26,
      stock: 39,
      category: 'tops',
      images: [
        'https://cdn.dummyjson.com/product-images/36/1.jpg',
        'https://cdn.dummyjson.com/product-images/36/2.webp',
        'https://cdn.dummyjson.com/product-images/36/3.webp',
        'https://cdn.dummyjson.com/product-images/36/4.jpg',
        'https://cdn.dummyjson.com/product-images/36/thumbnail.jpg'
      ]
    },
    {
      title: 'ank Tops for Womens/Girls',
      description: 'PACK OF 3 CAMISOLES ,VERY COMFORTABLE SOFT COTTON STUFF, COMFORTABLE IN ALL FOUR SEASONS',
      price: 50,
      rating: 4.52,
      stock: 107,
      category: 'tops',
      images: [
        'https://cdn.dummyjson.com/product-images/37/1.jpg',
        'https://cdn.dummyjson.com/product-images/37/2.jpg',
        'https://cdn.dummyjson.com/product-images/37/3.jpg',
        'https://cdn.dummyjson.com/product-images/37/4.jpg',
        'https://cdn.dummyjson.com/product-images/37/thumbnail.jpg'
      ]
    },
    {
      title: 'sublimation plain kids tank',
      description: 'sublimation plain kids tank tops wholesale',
      price: 100,
      rating: 4.8,
      stock: 20,
      category: 'tops',
      images: [
        'https://cdn.dummyjson.com/product-images/38/1.png',
        'https://cdn.dummyjson.com/product-images/38/2.jpg',
        'https://cdn.dummyjson.com/product-images/38/3.jpg',
        'https://cdn.dummyjson.com/product-images/38/4.jpg'
      ]
    },
    {
      title: 'Women Sweaters Wool',
      description: "2021 Custom Winter Fall Zebra Knit Crop Top Women Sweaters Wool Mohair Cos Customize Crew Neck Women' S Crop Top Sweater",
      price: 600,
      rating: 4.55,
      stock: 55,
      category: 'tops',
      images: [
        'https://cdn.dummyjson.com/product-images/39/1.jpg',
        'https://cdn.dummyjson.com/product-images/39/2.jpg',
        'https://cdn.dummyjson.com/product-images/39/3.jpg',
        'https://cdn.dummyjson.com/product-images/39/4.jpg',
        'https://cdn.dummyjson.com/product-images/39/thumbnail.jpg'
      ]
    },
    {
      title: 'women winter clothes',
      description: 'women winter clothes thick fleece hoodie top with sweat pantjogger women sweatsuit set joggers pants two piece pants set',
      price: 57,
      rating: 4.91,
      stock: 84,
      category: 'tops',
      images: [
        'https://cdn.dummyjson.com/product-images/40/1.jpg',
        'https://cdn.dummyjson.com/product-images/40/2.jpg'
      ]
    },
    {
      title: 'NIGHT SUIT',
      description: 'NIGHT SUIT RED MICKY MOUSE..  For Girls. Fantastic Suits.',
      price: 55,
      rating: 4.65,
      stock: 21,
      category: 'womens-dresses',
      images: [
        'https://cdn.dummyjson.com/product-images/41/1.jpg',
        'https://cdn.dummyjson.com/product-images/41/2.webp',
        'https://cdn.dummyjson.com/product-images/41/3.jpg',
        'https://cdn.dummyjson.com/product-images/41/4.jpg',
        'https://cdn.dummyjson.com/product-images/41/thumbnail.webp'
      ]
    },
    {
      title: 'Stiched Kurta plus trouser',
      description: 'FABRIC: LILEIN CHEST: 21 LENGHT: 37 TROUSER: (38) :ARABIC LILEIN',
      price: 80,
      rating: 4.05,
      stock: 148,
      category: 'womens-dresses',
      images: [
        'https://cdn.dummyjson.com/product-images/42/1.png',
        'https://cdn.dummyjson.com/product-images/42/2.png',
        'https://cdn.dummyjson.com/product-images/42/3.png',
        'https://cdn.dummyjson.com/product-images/42/4.jpg',
        'https://cdn.dummyjson.com/product-images/42/thumbnail.jpg'
      ]
    },
    {
      title: 'frock gold printed',
      description: 'Ghazi fabric long frock gold printed ready to wear stitched collection (G992)',
      price: 600,
      rating: 4.31,
      stock: 150,
      category: 'womens-dresses',
      images: [
        'https://cdn.dummyjson.com/product-images/43/1.jpg',
        'https://cdn.dummyjson.com/product-images/43/2.jpg',
        'https://cdn.dummyjson.com/product-images/43/3.jpg',
        'https://cdn.dummyjson.com/product-images/43/4.jpg',
        'https://cdn.dummyjson.com/product-images/43/thumbnail.jpg'
      ]
    },
    {
      title: 'Ladies Multicolored Dress',
      description: 'This classy shirt for women gives you a gorgeous look on everyday wear and specially for semi-casual wears.',
      price: 79,
      rating: 4.03,
      stock: 2,
      category: 'womens-dresses',
      images: [
        'https://cdn.dummyjson.com/product-images/44/1.jpg',
        'https://cdn.dummyjson.com/product-images/44/2.jpg',
        'https://cdn.dummyjson.com/product-images/44/3.jpg',
        'https://cdn.dummyjson.com/product-images/44/4.jpg',
        'https://cdn.dummyjson.com/product-images/44/thumbnail.jpg'
      ]
    },
    {
      title: 'Malai Maxi Dress',
      description: 'Ready to wear, Unique design according to modern standard fashion, Best fitting ,Imported stuff',
      price: 50,
      rating: 4.67,
      stock: 96,
      category: 'womens-dresses',
      images: [
        'https://cdn.dummyjson.com/product-images/45/1.jpg',
        'https://cdn.dummyjson.com/product-images/45/2.webp',
        'https://cdn.dummyjson.com/product-images/45/3.jpg',
        'https://cdn.dummyjson.com/product-images/45/4.jpg',
        'https://cdn.dummyjson.com/product-images/45/thumbnail.jpg'
      ]
    },
    {
      title: "women's shoes",
      description: 'Close: Lace, Style with bottom: Increased inside, Sole Material: Rubber',
      price: 40,
      rating: 4.14,
      stock: 72,
      category: 'womens-shoes',
      images: [
        'https://cdn.dummyjson.com/product-images/46/1.webp',
        'https://cdn.dummyjson.com/product-images/46/2.jpg',
        'https://cdn.dummyjson.com/product-images/46/3.jpg',
        'https://cdn.dummyjson.com/product-images/46/4.jpg',
        'https://cdn.dummyjson.com/product-images/46/thumbnail.jpg'
      ]
    },
    {
      title: 'Sneaker shoes',
      description: 'Synthetic Leather Casual Sneaker shoes for Women/girls Sneakers For Women',
      price: 120,
      rating: 4.19,
      stock: 50,
      category: 'womens-shoes',
      images: [
        'https://cdn.dummyjson.com/product-images/47/1.jpg',
        'https://cdn.dummyjson.com/product-images/47/2.jpg',
        'https://cdn.dummyjson.com/product-images/47/3.jpg',
        'https://cdn.dummyjson.com/product-images/47/thumbnail.jpeg'
      ]
    },
    {
      title: 'Women Strip Heel',
      description: 'Features: Flip-flops, Mid Heel, Comfortable, Striped Heel, Antiskid, Striped',
      price: 40,
      rating: 4.02,
      stock: 25,
      category: 'womens-shoes',
      images: [
        'https://cdn.dummyjson.com/product-images/48/1.jpg',
        'https://cdn.dummyjson.com/product-images/48/2.jpg',
        'https://cdn.dummyjson.com/product-images/48/3.jpg',
        'https://cdn.dummyjson.com/product-images/48/4.jpg',
        'https://cdn.dummyjson.com/product-images/48/thumbnail.jpg'
      ]
    },
    {
      title: 'Chappals & Shoe Ladies Metallic',
      description: 'Womens Chappals & Shoe Ladies Metallic Tong Thong Sandal Flat Summer 2020 Maasai Sandals',
      price: 23,
      rating: 4.72,
      stock: 107,
      category: 'womens-shoes',
      images: [
        'https://cdn.dummyjson.com/product-images/49/1.jpg',
        'https://cdn.dummyjson.com/product-images/49/2.jpg',
        'https://cdn.dummyjson.com/product-images/49/3.webp',
        'https://cdn.dummyjson.com/product-images/49/thumbnail.jpg'
      ]
    },
    {
      title: 'Women Shoes',
      description: '2020 New Arrivals Genuine Leather Fashion Trend Platform Summer Women Shoes',
      price: 36,
      rating: 4.33,
      stock: 46,
      category: 'womens-shoes',
      images: [
        'https://cdn.dummyjson.com/product-images/50/1.jpeg',
        'https://cdn.dummyjson.com/product-images/50/2.jpg',
        'https://cdn.dummyjson.com/product-images/50/3.jpg'
      ]
    },
    {
      title: 'half sleeves T shirts',
      description: 'Many store is creating new designs and trend every month and every year. Daraz.pk have a beautiful range of men fashion brands',
      price: 23,
      rating: 4.26,
      stock: 132,
      category: 'mens-shirts',
      images: [
        'https://cdn.dummyjson.com/product-images/51/1.png',
        'https://cdn.dummyjson.com/product-images/51/2.jpg',
        'https://cdn.dummyjson.com/product-images/51/3.jpg',
        'https://cdn.dummyjson.com/product-images/51/thumbnail.jpg'
      ]
    },
    {
      title: 'FREE FIRE T Shirt',
      description: "quality and professional print - It doesn't just look high quality, it is high quality.",
      price: 10,
      rating: 4.52,
      stock: 128,
      category: 'mens-shirts',
      images: [
        'https://cdn.dummyjson.com/product-images/52/1.png',
        'https://cdn.dummyjson.com/product-images/52/2.png',
        'https://cdn.dummyjson.com/product-images/52/3.jpg',
        'https://cdn.dummyjson.com/product-images/52/4.jpg',
        'https://cdn.dummyjson.com/product-images/52/thumbnail.jpg'
      ]
    },
    {
      title: 'printed high quality T shirts',
      description: 'Brand: vintage Apparel ,Export quality',
      price: 35,
      rating: 4.89,
      stock: 6,
      category: 'mens-shirts',
      images: [
        'https://cdn.dummyjson.com/product-images/53/1.webp',
        'https://cdn.dummyjson.com/product-images/53/2.jpg',
        'https://cdn.dummyjson.com/product-images/53/3.jpg',
        'https://cdn.dummyjson.com/product-images/53/4.jpg',
        'https://cdn.dummyjson.com/product-images/53/thumbnail.jpg'
      ]
    },
    {
      title: 'Pubg Printed Graphic T-Shirt',
      description: 'Product Description Features: 100% Ultra soft Polyester Jersey. Vibrant & colorful printing on front. Feels soft as cotton without ever cracking',
      price: 46,
      rating: 4.62,
      stock: 136,
      category: 'mens-shirts',
      images: [
        'https://cdn.dummyjson.com/product-images/54/1.jpg',
        'https://cdn.dummyjson.com/product-images/54/2.jpg',
        'https://cdn.dummyjson.com/product-images/54/3.jpg',
        'https://cdn.dummyjson.com/product-images/54/4.jpg',
        'https://cdn.dummyjson.com/product-images/54/thumbnail.jpg'
      ]
    },
    {
      title: 'Money Heist Printed Summer T Shirts',
      description: 'Fabric Jercy, Size: M & L Wear Stylish Dual Stiched',
      price: 66,
      rating: 4.9,
      stock: 122,
      category: 'mens-shirts',
      images: [
        'https://cdn.dummyjson.com/product-images/55/1.jpg',
        'https://cdn.dummyjson.com/product-images/55/2.webp',
        'https://cdn.dummyjson.com/product-images/55/3.jpg',
        'https://cdn.dummyjson.com/product-images/55/4.jpg',
        'https://cdn.dummyjson.com/product-images/55/thumbnail.jpg'
      ]
    },
    {
      title: 'Sneakers Joggers Shoes',
      description: 'Gender: Men , Colors: Same as DisplayedCondition: 100% Brand New',
      price: 40,
      rating: 4.38,
      stock: 6,
      category: 'mens-shoes',
      images: [
        'https://cdn.dummyjson.com/product-images/56/1.jpg',
        'https://cdn.dummyjson.com/product-images/56/2.jpg',
        'https://cdn.dummyjson.com/product-images/56/3.jpg',
        'https://cdn.dummyjson.com/product-images/56/4.jpg',
        'https://cdn.dummyjson.com/product-images/56/5.jpg',
        'https://cdn.dummyjson.com/product-images/56/thumbnail.jpg'
      ]
    },
    {
      title: 'Loafers for men',
      description: 'Men Shoes - Loafers for men - Rubber Shoes - Nylon Shoes - Shoes for men - Moccassion - Pure Nylon (Rubber) Expot Quality.',
      price: 47,
      rating: 4.91,
      stock: 20,
      category: 'mens-shoes',
      images: [
        'https://cdn.dummyjson.com/product-images/57/1.jpg',
        'https://cdn.dummyjson.com/product-images/57/2.jpg',
        'https://cdn.dummyjson.com/product-images/57/3.jpg',
        'https://cdn.dummyjson.com/product-images/57/4.jpg',
        'https://cdn.dummyjson.com/product-images/57/thumbnail.jpg'
      ]
    },
    {
      title: 'formal offices shoes',
      description: 'Pattern Type: Solid, Material: PU, Toe Shape: Pointed Toe ,Outsole Material: Rubber',
      price: 57,
      rating: 4.41,
      stock: 68,
      category: 'mens-shoes',
      images: [
    'https://cdn.dummyjson.com/product-images/58/1.jpg',
        'https://cdn.dummyjson.com/product-images/58/2.jpg',
        'https://cdn.dummyjson.com/product-images/58/3.jpg',
        'https://cdn.dummyjson.com/product-images/58/4.jpg',
        'https://cdn.dummyjson.com/product-images/58/thumbnail.jpg'
      ]
    },
    {
      title: 'Spring and summershoes',
      description: 'Comfortable stretch cloth, lightweight body; ,rubber sole, anti-skid wear;',
      price: 20,
      rating: 4.33,
      stock: 137,
      category: 'mens-shoes',
      images: [
        'https://cdn.dummyjson.com/product-images/59/1.jpg',
        'https://cdn.dummyjson.com/product-images/59/2.jpg',
        'https://cdn.dummyjson.com/product-images/59/3.jpg',
        'https://cdn.dummyjson.com/product-images/59/4.jpg',
        'https://cdn.dummyjson.com/product-images/59/thumbnail.jpg'
      ]
    },
    {
      title: 'Stylish Casual Jeans Shoes',
      description: 'High Quality ,Stylish design ,Comfortable wear ,FAshion ,Durable',
      price: 58,
      rating: 4.55,
      stock: 129,
      category: 'mens-shoes',
      images: [
        'https://cdn.dummyjson.com/product-images/60/1.jpg',
        'https://cdn.dummyjson.com/product-images/60/2.jpg',
        'https://cdn.dummyjson.com/product-images/60/3.jpg',
        'https://cdn.dummyjson.com/product-images/60/thumbnail.jpg'
      ]
    },
    {
      title: 'Leather Straps Wristwatch',
      description: 'Style:Sport ,Clasp:Buckles ,Water Resistance Depth:3Bar',
      price: 120,
      rating: 4.63,
      stock: 91,
      category: 'mens-watches',
      images: [
        'https://cdn.dummyjson.com/product-images/61/1.jpg',
        'https://cdn.dummyjson.com/product-images/61/2.png',
        'https://cdn.dummyjson.com/product-images/61/3.jpg'
      ]
    },
    {
      title: 'Waterproof Leather Brand Watch',
      description: 'Watch Crown With Environmental IPS Bronze Electroplating; Display system of 12 hours',
      price: 46,
      rating: 4.05,
      stock: 95,
      category: 'mens-watches',
      images: [
        'https://cdn.dummyjson.com/product-images/62/1.jpg',
        'https://cdn.dummyjson.com/product-images/62/2.jpg'
      ]
    },
    {
      title: 'Royal Blue Premium Watch',
      description: 'Men Silver Chain Royal Blue Premium Watch Latest Analog Watch',
      price: 50,
      rating: 4.89,
      stock: 142,
      category: 'mens-watches',
      images: [
        'https://cdn.dummyjson.com/product-images/63/1.jpg',
        'https://cdn.dummyjson.com/product-images/63/2.jpg',
        'https://cdn.dummyjson.com/product-images/63/3.png',
        'https://cdn.dummyjson.com/product-images/63/4.jpeg'
      ]
    },
    {
      title: 'Leather Strap Skeleton Watch',
      description: 'Leather Strap Skeleton Watch for Men - Stylish and Latest Design',
      price: 46,
      rating: 4.98,
      stock: 61,
      category: 'mens-watches',
      images: [
        'https://cdn.dummyjson.com/product-images/64/1.jpg',
        'https://cdn.dummyjson.com/product-images/64/2.webp',
        'https://cdn.dummyjson.com/product-images/64/3.jpg',
        'https://cdn.dummyjson.com/product-images/64/thumbnail.jpg'
      ]
    },
    {
      title: 'Stainless Steel Wrist Watch',
      description: "Stylish Watch For Man (Luxury) Classy Men's Stainless Steel Wrist Watch - Box Packed",
      price: 47,
      rating: 4.79,
      stock: 94,
      category: 'mens-watches',
      images: [
        'https://cdn.dummyjson.com/product-images/65/1.jpg',
        'https://cdn.dummyjson.com/product-images/65/2.webp',
        'https://cdn.dummyjson.com/product-images/65/3.jpg',
        'https://cdn.dummyjson.com/product-images/65/4.webp',
        'https://cdn.dummyjson.com/product-images/65/thumbnail.webp'
      ]
    },
    {
      title: 'Steel Analog Couple Watches',
      description: 'Elegant design, Stylish ,Unique & Trendy,Comfortable wear',
      price: 35,
      rating: 4.79,
      stock: 24,
      category: 'womens-watches',
      images: [
        'https://cdn.dummyjson.com/product-images/66/1.jpg',
        'https://cdn.dummyjson.com/product-images/66/2.jpg',
        'https://cdn.dummyjson.com/product-images/66/3.jpg',
        'https://cdn.dummyjson.com/product-images/66/4.JPG',
        'https://cdn.dummyjson.com/product-images/66/thumbnail.jpg'
      ]
    },
    {
      title: 'Fashion Magnetic Wrist Watch',
      description: "Buy this awesome  The product is originally manufactured by the company and it's a top selling product with a very reasonable",
      price: 60,
      rating: 4.03,
      stock: 46,
      category: 'womens-watches',
      images: [
        'https://cdn.dummyjson.com/product-images/67/1.jpg',
        'https://cdn.dummyjson.com/product-images/67/2.jpg',
        'https://cdn.dummyjson.com/product-images/67/3.jpg',
        'https://cdn.dummyjson.com/product-images/67/4.jpg',
        'https://cdn.dummyjson.com/product-images/67/thumbnail.jpg'
      ]
    },
    {
      title: 'Stylish Luxury Digital Watch',
      description: 'Stylish Luxury Digital Watch For Girls / Women - Led Smart Ladies Watches For Girls',
      price: 57,
      rating: 4.55,
      stock: 77,
      category: 'womens-watches',
      images: [
        'https://cdn.dummyjson.com/product-images/68/1.jpg',
        'https://cdn.dummyjson.com/product-images/68/2.jpg'
      ]
    },
    {
      title: 'Golden Watch Pearls Bracelet Watch',
      description: 'Product details of Golden Watch Pearls Bracelet Watch For Girls - Golden Chain Ladies Bracelate Watch for Women',
      price: 47,
      rating: 4.77,
      stock: 89,
      category: 'womens-watches',
      images: [
        'https://cdn.dummyjson.com/product-images/69/1.jpg',
        'https://cdn.dummyjson.com/product-images/69/2.jpg',
        'https://cdn.dummyjson.com/product-images/69/3.webp',
        'https://cdn.dummyjson.com/product-images/69/4.jpg',
        'https://cdn.dummyjson.com/product-images/69/thumbnail.jpg'
      ]
    },
    {
      title: 'Stainless Steel Women',
      description: 'Fashion Skmei 1830 Shell Dial Stainless Steel Women Wrist Watch Lady Bracelet Watch Quartz Watches Ladies',
      price: 35,
      rating: 4.08,
      stock: 111,
      category: 'womens-watches',
      images: [
        'https://cdn.dummyjson.com/product-images/70/1.jpg',
        'https://cdn.dummyjson.com/product-images/70/2.jpg',
        'https://cdn.dummyjson.com/product-images/70/thumbnail.jpg'
      ]
    },
    {
      title: 'Women Shoulder Bags',
      description: 'LouisWill Women Shoulder Bags Long Clutches Cross Body Bags Phone Bags PU Leather Hand Bags Large Capacity Card Holders Zipper Coin Purses Fashion Crossbody Bags for Girls Ladies',
      price: 46,
      rating: 4.71,
      stock: 17,
      category: 'womens-bags',
      images: [
        'https://cdn.dummyjson.com/product-images/71/1.jpg',
        'https://cdn.dummyjson.com/product-images/71/2.jpg',
        'https://cdn.dummyjson.com/product-images/71/3.webp',
        'https://cdn.dummyjson.com/product-images/71/thumbnail.jpg'
      ]
    },
    {
      title: 'Handbag For Girls',
      description: 'This fashion is designed to add a charming effect to your casual outfit. This Bag is made of synthetic leather.',
      price: 23,
      rating: 4.91,
      stock: 27,
      category: 'womens-bags',
      images: [
        'https://cdn.dummyjson.com/product-images/72/1.jpg',
        'https://cdn.dummyjson.com/product-images/72/2.png',
        'https://cdn.dummyjson.com/product-images/72/3.webp',
        'https://cdn.dummyjson.com/product-images/72/4.jpg',
        'https://cdn.dummyjson.com/product-images/72/thumbnail.webp'
      ]
    },
    {
      title: 'Fancy hand clutch',
      description: 'This fashion is designed to add a charming effect to your casual outfit. This Bag is made of synthetic leather.',
      price: 44,
      rating: 4.18,
      stock: 101,
      category: 'womens-bags',
      images: [
        'https://cdn.dummyjson.com/product-images/73/1.jpg',
        'https://cdn.dummyjson.com/product-images/73/2.webp',
        'https://cdn.dummyjson.com/product-images/73/3.jpg',
        'https://cdn.dummyjson.com/product-images/73/thumbnail.jpg'
      ]
    },
    {
      title: 'Leather Hand Bag',
      description: 'It features an attractive design that makes it a must have accessory in your collection. We sell different kind of bags for boys, kids, women, girls and also for unisex.',
      price: 57,
      rating: 4.01,
      stock: 43,
      category: 'womens-bags',
      images: [
        'https://cdn.dummyjson.com/product-images/74/1.jpg',
        'https://cdn.dummyjson.com/product-images/74/2.jpg',
        'https://cdn.dummyjson.com/product-images/74/3.jpg',
        'https://cdn.dummyjson.com/product-images/74/4.jpg',
        'https://cdn.dummyjson.com/product-images/74/thumbnail.jpg'
      ]
    },
    {
      title: 'Seven Pocket Women Bag',
      description: 'Seven Pocket Women Bag Handbags Lady Shoulder Crossbody Bag Female Purse Seven Pocket Bag',
      price: 68,
      rating: 4.93,
      stock: 13,
      category: 'womens-bags',
      images: [
        'https://cdn.dummyjson.com/product-images/75/1.jpg',
        'https://cdn.dummyjson.com/product-images/75/2.jpg',
        'https://cdn.dummyjson.com/product-images/75/3.jpg',
        'https://cdn.dummyjson.com/product-images/75/thumbnail.jpg'
      ]
    },
    {
      title: 'Silver Ring Set Women',
      description: 'Jewelry Type:RingsCertificate Type:NonePlating:Silver PlatedShapeattern:noneStyle:CLASSICReligious',
      price: 70,
      rating: 4.61,
      stock: 51,
      category: 'womens-jewellery',
      images: [
        'https://cdn.dummyjson.com/product-images/76/1.jpg',
        'https://cdn.dummyjson.com/product-images/76/2.jpg',
        'https://cdn.dummyjson.com/product-images/76/thumbnail.jpg'
      ]
    },
    {
      title: 'Rose Ring',
      description: 'Brand: The Greetings Flower Colour: RedRing Colour: GoldenSize: Adjustable',
      price: 100,
      rating: 4.21,
      stock: 149,
      category: 'womens-jewellery',
      images: [
        'https://cdn.dummyjson.com/product-images/77/1.jpg',
        'https://cdn.dummyjson.com/product-images/77/2.jpg',
        'https://cdn.dummyjson.com/product-images/77/3.jpg',
        'https://cdn.dummyjson.com/product-images/77/thumbnail.jpg'
      ]
    },
    {
      title: 'Rhinestone Korean Style Open Rings',
      description: 'Fashion Jewellery 3Pcs Adjustable Pearl Rhinestone Korean Style Open Rings For Women',
     price: 30,
      rating: 4.69,
      stock: 9,
      category: 'womens-jewellery',
      images: [ 'https://cdn.dummyjson.com/product-images/78/thumbnail.jpg' ]
    },
    {
      title: 'Elegant Female Pearl Earrings',
      description: 'Elegant Female Pearl Earrings Set Zircon Pearl Earings Women Party Accessories 9 Pairs/Set',
      price: 30,
      rating: 4.74,
      stock: 16,
      category: 'womens-jewellery',
      images: [ 'https://cdn.dummyjson.com/product-images/79/1.jpg' ]
    },
    {
      title: 'Chain Pin Tassel Earrings',
      description: 'Pair Of Ear Cuff Butterfly Long Chain Pin Tassel Earrings - Silver ( Long Life Quality Product)',
      price: 45,
      rating: 4.59,
      stock: 9,
      category: 'womens-jewellery',
      images: [
        'https://cdn.dummyjson.com/product-images/80/1.jpg',
        'https://cdn.dummyjson.com/product-images/80/2.jpg',
        'https://cdn.dummyjson.com/product-images/80/3.png',
        'https://cdn.dummyjson.com/product-images/80/4.jpg',
        'https://cdn.dummyjson.com/product-images/80/thumbnail.jpg'
      ]
    },
    {
      title: 'Round Silver Frame Sun Glasses',
      description: 'A pair of sunglasses can protect your eyes from being hurt. For car driving, vacation travel, outdoor activities, social gatherings,',
      price: 19,
      rating: 4.94,
      stock: 78,
      category: 'sunglasses',
      images: [
        'https://cdn.dummyjson.com/product-images/81/1.jpg',
        'https://cdn.dummyjson.com/product-images/81/2.jpg',
        'https://cdn.dummyjson.com/product-images/81/3.jpg',
        'https://cdn.dummyjson.com/product-images/81/4.webp',
        'https://cdn.dummyjson.com/product-images/81/thumbnail.jpg'
      ]
    },
    {
      title: 'Kabir Singh Square Sunglass',
      description: 'Orignal Metal Kabir Singh design 2020 Sunglasses Men Brand Designer Sun Glasses Kabir Singh Square Sunglass',
      price: 50,
      rating: 4.62,
      stock: 78,
      category: 'sunglasses',
      images: [
        'https://cdn.dummyjson.com/product-images/82/1.jpg',
        'https://cdn.dummyjson.com/product-images/82/2.webp',
        'https://cdn.dummyjson.com/product-images/82/3.jpg',
        'https://cdn.dummyjson.com/product-images/82/4.jpg',
        'https://cdn.dummyjson.com/product-images/82/thumbnail.jpg'
      ]
    },
    {
      title: 'Wiley X Night Vision Yellow Glasses',
      description: 'Wiley X Night Vision Yellow Glasses for Riders - Night Vision Anti Fog Driving Glasses - Free Night Glass Cover - Shield Eyes From Dust and Virus- For Night Sport Matches',
      price: 30,
      rating: 4.97,
      stock: 115,
      category: 'sunglasses',
      images: [
        'https://cdn.dummyjson.com/product-images/83/1.jpg',
        'https://cdn.dummyjson.com/product-images/83/2.jpg',
        'https://cdn.dummyjson.com/product-images/83/3.jpg',
        'https://cdn.dummyjson.com/product-images/83/4.jpg',
        'https://cdn.dummyjson.com/product-images/83/thumbnail.jpg'
      ]
    },
    {
      title: 'Square Sunglasses',
      description: 'Fashion Oversized Square Sunglasses Retro Gradient Big Frame Sunglasses For Women One Piece Gafas Shade Mirror Clear Lens 17059',
      price: 28,
      rating: 4.64,
      stock: 64,
      category: 'sunglasses',
      images: [
        'https://cdn.dummyjson.com/product-images/84/1.jpg',
        'https://cdn.dummyjson.com/product-images/84/2.jpg',
        'https://cdn.dummyjson.com/product-images/84/thumbnail.jpg'
      ]
    },
    {
      title: 'LouisWill Men Sunglasses',
      description: 'LouisWill Men Sunglasses Polarized Sunglasses UV400 Sunglasses Day Night Dual Use Safety Driving Night Vision Eyewear AL-MG Frame Sun Glasses with Free Box for Drivers',
      price: 50,
      rating: 4.98,
      stock: 92,
      category: 'sunglasses',
      images: [
        'https://cdn.dummyjson.com/product-images/85/1.jpg',
        'https://cdn.dummyjson.com/product-images/85/2.jpg',
        'https://cdn.dummyjson.com/product-images/85/thumbnail.jpg'
      ]
    },
    {
      title: 'Bluetooth Aux',
      description: 'Bluetooth Aux Bluetooth Car Aux Car Bluetooth Transmitter Aux Audio Receiver Handfree Car Bluetooth Music Receiver Universal 3.5mm Streaming A2DP Wireless Auto AUX Audio Adapter With Mic For Phone MP3',
      price: 25,
      rating: 4.57,
      stock: 22,
      category: 'automotive',
      images: [
        'https://cdn.dummyjson.com/product-images/86/1.jpg',
        'https://cdn.dummyjson.com/product-images/86/2.webp',
        'https://cdn.dummyjson.com/product-images/86/3.jpg',
        'https://cdn.dummyjson.com/product-images/86/4.jpg',
        'https://cdn.dummyjson.com/product-images/86/thumbnail.jpg'
      ]
    },
    {
      title: 't Temperature Controller Incubator Controller',
      description: 'Both Heat and Cool Purpose, Temperature control range; -50 to +110, Temperature measurement accuracy; 0.1, Control accuracy; 0.1',
      price: 40,
      rating: 4.54,
      stock: 37,
      category: 'automotive',
      images: [
        'https://cdn.dummyjson.com/product-images/87/1.jpg',
        'https://cdn.dummyjson.com/product-images/87/2.jpg',
        'https://cdn.dummyjson.com/product-images/87/3.jpg',
        'https://cdn.dummyjson.com/product-images/87/4.jpg',
        'https://cdn.dummyjson.com/product-images/87/thumbnail.jpg'
      ]
    },
    {
      title: 'TC Reusable Silicone Magic Washing Gloves',
      description: 'TC Reusable Silicone Magic Washing Gloves with Scrubber, Cleaning Brush Scrubber Gloves Heat Resistant Pair for Cleaning of Kitchen, Dishes, Vegetables and Fruits, Bathroom, Car Wash, Pet Care and Multipurpose',
      price: 29,
      rating: 4.98,
      stock: 42,
      category: 'automotive',
      images: [
        'https://cdn.dummyjson.com/product-images/88/1.jpg',
        'https://cdn.dummyjson.com/product-images/88/2.jpg',
        'https://cdn.dummyjson.com/product-images/88/3.jpg',
        'https://cdn.dummyjson.com/product-images/88/4.webp',
        'https://cdn.dummyjson.com/product-images/88/thumbnail.jpg'
      ]
    },
    {
      title: 'Qualcomm original Car Charger',
      description: 'best Quality CHarger , Highly Recommended to all best Quality CHarger , Highly Recommended to all',
      price: 40,
      rating: 4.2,
      stock: 79,
      category: 'automotive',
      images: [
        'https://cdn.dummyjson.com/product-images/89/1.jpg',
        'https://cdn.dummyjson.com/product-images/89/2.jpg',
        'https://cdn.dummyjson.com/product-images/89/3.jpg',
        'https://cdn.dummyjson.com/product-images/89/4.jpg',
        'https://cdn.dummyjson.com/product-images/89/thumbnail.jpg'
      ]
    },
    {
      title: 'Cycle Bike Glow',
      description: 'Universal fitment and easy to install no special wires, can be easily installed and removed. Fits most standard tyre air stem valves of road, mountain bicycles, motocycles and cars.Bright led will turn on w',
      price: 35,
      rating: 4.1,
      stock: 63,
      category: 'automotive',
      images: [
        'https://cdn.dummyjson.com/product-images/90/1.jpg',
        'https://cdn.dummyjson.com/product-images/90/2.jpg',
        'https://cdn.dummyjson.com/product-images/90/3.jpg',
        'https://cdn.dummyjson.com/product-images/90/4.jpg',
        'https://cdn.dummyjson.com/product-images/90/thumbnail.jpg'
      ]
    },
    {
      title: 'Black Motorbike',
      description: 'Engine Type:Wet sump, Single Cylinder, Four Stroke, Two Valves, Air Cooled with SOHC (Single Over Head Cam) Chain Drive Bore & Stroke:47.0 x 49.5 MM',
      price: 569,
      rating: 4.04,
      stock: 115,
      category: 'motorcycle',
      images: [
        'https://cdn.dummyjson.com/product-images/91/1.jpg',
        'https://cdn.dummyjson.com/product-images/91/2.jpg',
        'https://cdn.dummyjson.com/product-images/91/3.jpg',
        'https://cdn.dummyjson.com/product-images/91/4.jpg',
        'https://cdn.dummyjson.com/product-images/91/thumbnail.jpg'
      ]
    },
    {
      title: 'HOT SALE IN EUROPE electric racing motorcycle',
      description: 'HOT SALE IN EUROPE electric racing motorcycle electric motorcycle for sale adult electric motorcycles',
      price: 920,
      rating: 4.19,
      stock: 22,
      category: 'motorcycle',
      images: [
        'https://cdn.dummyjson.com/product-images/92/1.jpg',
        'https://cdn.dummyjson.com/product-images/92/2.jpg',
        'https://cdn.dummyjson.com/product-images/92/3.jpg',
        'https://cdn.dummyjson.com/product-images/92/4.jpg'
      ]
    },
    {
      title: 'Automatic Motor Gas Motorcycles',
      description: '150cc 4-Stroke Motorcycle Automatic Motor Gas Motorcycles Scooter motorcycles 150cc scooter',
      price: 1050,
      rating: 4.84,
      stock: 127,
      category: 'motorcycle',
      images: [
        'https://cdn.dummyjson.com/product-images/93/1.jpg',
        'https://cdn.dummyjson.com/product-images/93/2.jpg',
        'https://cdn.dummyjson.com/product-images/93/3.jpg',
        'https://cdn.dummyjson.com/product-images/93/4.jpg',
        'https://cdn.dummyjson.com/product-images/93/thumbnail.jpg'
      ]
    },
    {
      title: 'new arrivals Fashion motocross goggles',
      description: 'new arrivals Fashion motocross goggles motorcycle motocross racing motorcycle',
      price: 900,
      rating: 4.06,
      stock: 109,
      category: 'motorcycle',
      images: [
        'https://cdn.dummyjson.com/product-images/94/1.webp',
        'https://cdn.dummyjson.com/product-images/94/2.jpg',
        'https://cdn.dummyjson.com/product-images/94/3.jpg',
        'https://cdn.dummyjson.com/product-images/94/thumbnail.webp'
      ]
    },
    {
      title: 'Wholesale cargo lashing Belt',
      description: 'Wholesale cargo lashing Belt Tie Down end Ratchet strap customized strap 25mm motorcycle 1500kgs with rubber handle',
      price: 930,
      rating: 4.21,
      stock: 144,
      category: 'motorcycle',
      images: [
        'https://cdn.dummyjson.com/product-images/95/1.jpg',
        'https://cdn.dummyjson.com/product-images/95/2.jpg',
        'https://cdn.dummyjson.com/product-images/95/3.jpg',
        'https://cdn.dummyjson.com/product-images/95/4.jpg',
        'https://cdn.dummyjson.com/product-images/95/thumbnail.jpg'
      ]
    },
    {
      title: 'lighting ceiling kitchen',
      description: 'Wholesale slim hanging decorative kid room lighting ceiling kitchen chandeliers pendant light modern',
      price: 30,
      rating: 4.83,
      stock: 96,
      category: 'lighting',
      images: [
        'https://cdn.dummyjson.com/product-images/96/1.jpg',
        'https://cdn.dummyjson.com/product-images/96/2.jpg',
        'https://cdn.dummyjson.com/product-images/96/3.jpg',
        'https://cdn.dummyjson.com/product-images/96/4.jpg',
        'https://cdn.dummyjson.com/product-images/96/thumbnail.jpg'
      ]
    },
    {
      title: 'Metal Ceramic Flower',
      description: 'Metal Ceramic Flower Chandelier Home Lighting American Vintage Hanging Lighting Pendant Lamp',
      price: 35,
      rating: 4.93,
      stock: 146,
      category: 'lighting',
      images: [
        'https://cdn.dummyjson.com/product-images/97/1.jpg',
        'https://cdn.dummyjson.com/product-images/97/2.jpg',
        'https://cdn.dummyjson.com/product-images/97/3.jpg',
        'https://cdn.dummyjson.com/product-images/97/4.webp',
        'https://cdn.dummyjson.com/product-images/97/thumbnail.jpg'
      ]
    },
    {
      title: '3 lights lndenpant kitchen islang',
      description: '3 lights lndenpant kitchen islang dining room pendant rice paper chandelier contemporary led pendant light modern chandelier',
      price: 34,
      rating: 4.99,
      stock: 44,
      category: 'lighting',
      images: [
        'https://cdn.dummyjson.com/product-images/98/1.jpg',
        'https://cdn.dummyjson.com/product-images/98/2.jpg',
        'https://cdn.dummyjson.com/product-images/98/3.jpg',
        'https://cdn.dummyjson.com/product-images/98/4.jpg',
        'https://cdn.dummyjson.com/product-images/98/thumbnail.jpg'
      ]
    },
    {
      title: 'American Vintage Wood Pendant Light',
      description: 'American Vintage Wood Pendant Light Farmhouse Antique Hanging Lamp Lampara Colgante',
      price: 46,
      rating: 4.32,
      stock: 138,
      category: 'lighting',
      images: [
        'https://cdn.dummyjson.com/product-images/99/1.jpg',
        'https://cdn.dummyjson.com/product-images/99/2.jpg',
        'https://cdn.dummyjson.com/product-images/99/3.jpg',
        'https://cdn.dummyjson.com/product-images/99/4.jpg',
        'https://cdn.dummyjson.com/product-images/99/thumbnail.jpg'
      ]
    },
    {
      title: 'Crystal chandelier maria theresa for 12 light',
      description: 'Crystal chandelier maria theresa for 12 light',
      price: 47,
      rating: 4.74,
      stock: 133,
      category: 'lighting',
      images: [
        'https://cdn.dummyjson.com/product-images/100/1.jpg',
        'https://cdn.dummyjson.com/product-images/100/2.jpg',
        'https://cdn.dummyjson.com/product-images/100/3.jpg',
        'https://cdn.dummyjson.com/product-images/100/thumbnail.jpg'
      ]
    }
  ]
  

  for (const item of allData) {
    try {
      const product = await productModel(item).save();
      successResponseWithData(res, "Product Created Successfully", product);
    } catch (error) {
      // Handle error appropriately
      console.error("Error:", error);
    }
  }
};
*/


export const GetallCategory = async (req, res) => {
  try {
    //distinct is use for unique
    const allCategory = await productModel.distinct("category");
    console.log(allCategory);
    return successResponseWithData(res,"category List  fetched", allCategory);
  } catch (error) {
    console.log(error);
    return ErrorResponse(res, "Error searching for Category: " + error.message);
  }
};

export const GetSingleproductDetail = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await productModel.findById(id);

    if (!product) {
      return ErrorResponse(res, "Product not found");
    }

    return successResponse(res, product);
  } catch (error) {
    console.log(error);
  }
};

export const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);

    const { name, price, description, stock, category } = req.body;

    console.log(name, price, description, stock, category);

    const product = await productModel.findByIdAndUpdate(
      id,

      { name, price, description, stock, category },
      { new: true }
    );

    if (!product) {
      return ErrorResponse(res, "Product Not Found");
    }

    return successResponseWithData(
      res,
      "Product successfully updated",
      product
    );
  } catch (error) {
    console.log(error);
    return ErrorResponse(res, "Product not updated: " + error.message);
  }
};

export const DeleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await productModel.findByIdAndDelete(id);

    if (!product) {
      return ErrorResponse(res, "Product not found");
    }

    return successResponse(res, product);
  } catch (error) {
    console.log(error);
  }
};

export const SearchProduct = async (req, res) => {};

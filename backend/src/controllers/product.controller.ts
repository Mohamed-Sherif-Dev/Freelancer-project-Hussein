import { Request, Response } from "express";
import * as productService from "../services/product.service";
import cloudinary from "../config/cloudinary";
import streamifier from "streamifier";



export const createProduct = async (req: Request, res: Response) => {

  let imageData: any[] = [];

  if (req.file) {
    const uploadFromBuffer = () =>
      new Promise<any>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "products" },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          }
        );

        streamifier.createReadStream(req.file!.buffer).pipe(stream);
      });

    const result = await uploadFromBuffer();

    imageData.push({
      url: result.secure_url,
      public_id: result.public_id,
    });
  }

  const product = await productService.createProduct({
    ...req.body,
    image: imageData,
  });

  res.status(201).json({
    success: true,
    data: product,
  });
};

export const getProducts = async (req: Request, res: Response) => {
  const products = await productService.getProducts(req.query);

  res.status(200).json({
    success: true,
    data: products,
    message: "تم الحصول على المنتجات بنجاح",
  });
};

export const getProductById = async (req: Request, res: Response) => {
  const id = req.params.id as string;

  const product = await productService.getProductById(id);

  res.status(200).json({
    success: true,
    data: product,
    message: "تم الحصول على المنتج بنجاح",
  });
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    let updateData: any = { ...req.body };

    /* ========== UPLOAD IMAGE LIKE CREATE ========== */

    if (req.file) {
      const uploadFromBuffer = () =>
        new Promise<any>((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "products" },
            (error, result) => {
              if (result) resolve(result);
              else reject(error);
            }
          );

          streamifier.createReadStream(req.file!.buffer).pipe(stream);
        });

      const result = await uploadFromBuffer();

      updateData.image = [
        {
          url: result.secure_url,
          public_id: result.public_id,
        },
      ];
    }

    /* ========== UPDATE PRODUCT ========== */

    const product = await productService.updateProductById(id, updateData);

    res.status(200).json({
      success: true,
      data: product,
      message: "تم تحديث المنتج بنجاح",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "حدث خطأ أثناء التحديث",
    });
  }
};
export const deleteProduct = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const product = await productService.getProductById(id);

  if (!product) {
    return res.status(404).json({ message: "المنتج غير موجود" });
  }

  // delete images from cloudinary
  if (product.image?.length) {
    for (const img of product.image) {
      await cloudinary.uploader.destroy(img.public_id);
    }
  }

  await productService.deleteProductById(id);

  res.json({ success: true });
};



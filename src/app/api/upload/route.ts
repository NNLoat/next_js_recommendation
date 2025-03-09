// import { NextRequest, NextResponse } from "next/server";
// import { IncomingForm, File as FormidableFile } from "formidable";
// import fs from "fs";
// import path from "path";
// import { promisify } from "util";

// export const config = {
//   api: {
//     bodyParser: false, // Required for formidable
//   },
// };

// // Convert fs.rename to a promise-based function
// const renameAsync = promisify(fs.rename);

// export async function POST(req: NextRequest) {
//   try {
//     const data: { files: Record<string, FormidableFile> } = await new Promise((resolve, reject) => {
//       const form = new IncomingForm({ keepExtensions: true });

//       form.parse(req as any, (err, fields, files: any) => {
//         if (err) {
//           console.error("❌ Error parsing form:", err);
//           return reject({ error: "Failed to parse form data" });
//         }
//         resolve({ files });
//       });
//     });

//     const fileKey = Object.keys(data.files)[0];
//     const file = data.files[fileKey];

//     if (!file) {
//       return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
//     }

//     // Ensure `public/images` directory exists
//     const uploadDir = path.join(process.cwd(), "public/images");
//     if (!fs.existsSync(uploadDir)) {
//       fs.mkdirSync(uploadDir, { recursive: true });
//     }

//     // Generate a unique filename
//     const uniqueFilename = `${Date.now()}-${file.originalFilename}`;
//     const newFilePath = path.join(uploadDir, uniqueFilename);

//     // Move file to new location
//     await renameAsync(file.filepath, newFilePath);

//     console.log("✅ File uploaded successfully:", newFilePath);
//     return NextResponse.json({ imagePath: `/images/${uniqueFilename}` }, { status: 200 });

//   } catch (error) {
//     console.error("❌ Unexpected error:", error);
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }


import { NextRequest, NextResponse } from "next/server";
import { IncomingForm, File as FormidableFile } from "formidable";
import fs from "fs";
import path from "path";
import { promisify } from "util";

// Ensure formidable can handle streams
export const config = {
  api: {
    bodyParser: false, // Required for formidable
  },
};

// Convert fs functions to promise-based for async handling
const renameAsync = promisify(fs.rename);

export async function POST(req: NextRequest) {
  try {
    // Convert Next.js request (Web Streams API) to a Buffer
    const formData = await req.formData();
    console.log(formData)
    const file = formData.get("image") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Read file content as a Buffer
    const fileBuffer = Buffer.from(await file.arrayBuffer());

    // Ensure `public/images` directory exists
    const uploadDir = path.join(process.cwd(), "public/images");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Generate a unique filename
    const uniqueFilename = `${Date.now()}-${file.name}`;
    const filePath = path.join(uploadDir, uniqueFilename);

    // Write the file to disk
    await fs.promises.writeFile(filePath, fileBuffer);

    console.log("✅ File uploaded successfully:", filePath);
    return NextResponse.json({ imagePath: `/images/${uniqueFilename}` }, { status: 200 });

  } catch (error) {
    console.error("❌ Upload error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}





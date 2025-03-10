This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

<!-- First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
``` -->

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# Next.js E-Commerce Admin Panel

This is the nextjs project for showing products / managing products in the e-commerce system. It is built using **Next.js (App Router)** and integrates with a **MongoDB** database.

## Project Structure

Below is an overview of the project's folder structure:

/ ├── public/ ├── src/ │ ├── app/ │ ├── components/ │ ├── lib/ │ ├── models/ │ ├── types/ ├── .env.local ├── middleware.ts


### `/public`
โฟลเดอร์นี้ใช้สำหรับเก็บไฟล์สาธารณะ เช่น **รูปภาพ ไอคอน และไฟล์อื่นๆ** ที่สามารถเข้าถึงได้โดยตรงจากเบราว์เซอร์  
ไฟล์ที่อยู่ในโฟลเดอร์นี้สามารถเรียกใช้ได้ผ่าน URL เช่น `/images/example.png`

### `/src`
โฟลเดอร์นี้เป็นที่เก็บซอร์สโค้ดหลักของโปรเจกต์

#### `/src/app`
โฟลเดอร์นี้ใช้โครงสร้าง **App Router** ที่เปิดตัวใน Next.js 13+  
ประกอบไปด้วยเส้นทางการเข้าถึง (routes) และหน้าเพจต่างๆ ที่จัดเรียงตามระบบ **file-based routing**  

- `src/app/page.tsx` → ไฟล์หลักของแผงควบคุมผู้ดูแลระบบ
- `src/app/api/` → ไฟล์ที่ใช้สำหรับสร้าง **API routes** เพื่อเชื่อมต่อกับฐานข้อมูล เช่น **การดึงข้อมูล เพิ่ม แก้ไข และลบสินค้า**

#### `/src/components`
โฟลเดอร์นี้ใช้สำหรับเก็บ **UI Components** ที่สามารถนำกลับมาใช้ซ้ำได้ เช่น **ปุ่ม ตาราง โมดอล และฟอร์ม**  
ช่วยให้โค้ดเป็นระเบียบและดูแลรักษาได้ง่ายขึ้น

#### `/src/lib`
โฟลเดอร์นี้เก็บฟังก์ชันช่วยเหลือ (utility functions) ที่ใช้ทั่วทั้งแอปพลิเคชัน  
ตัวอย่างเช่น **ฟังก์ชันเชื่อมต่อฐานข้อมูล ตัวช่วยจัดรูปแบบข้อมูล และตัวช่วยเรียก API**

#### `/src/models`
โฟลเดอร์นี้ใช้สำหรับเก็บ **Mongoose models** เพื่อใช้ในการเชื่อมต่อและจัดการฐานข้อมูล MongoDB  
แต่ละไฟล์ในโฟลเดอร์นี้แทนโครงสร้างของคอลเล็กชันในฐานข้อมูล (เช่น `Product.ts` สำหรับข้อมูลสินค้า)

#### `/src/types`
โฟลเดอร์นี้เก็บไฟล์ **TypeScript types** เพื่อกำหนดโครงสร้างของข้อมูลที่ใช้ในแอปพลิเคชัน  
ช่วยให้มั่นใจได้ว่าการทำงานกับข้อมูล เช่น **สินค้า ผู้ใช้ และ API responses** มีความปลอดภัยและลดข้อผิดพลาดที่อาจเกิดขึ้น

### `.env.local`
ไฟล์นี้ใช้สำหรับเก็บตัวแปรแวดล้อม (environment variables) เช่น **คีย์ API และสตริงเชื่อมต่อฐานข้อมูล**  
**ไม่ควร** อัปโหลดไฟล์นี้ไปยังระบบจัดการเวอร์ชัน (Git) เพื่อป้องกันข้อมูลสำคัญรั่วไหล

### `middleware.ts`
ไฟล์ **Middleware** ใช้สำหรับจัดการงานที่ต้องทำก่อนหรือหลังการร้องขอข้อมูล เช่น  
**การตรวจสอบสิทธิ์ การบันทึกล็อก หรือการแก้ไขข้อมูลก่อนส่งไปยัง API หรือหน้าเพจ**

---

## วิธีเริ่มต้นใช้งาน

### การติดตั้ง
1. โคลนโปรเจกต์นี้:
   ```bash
   git clone https://github.com/your-repo/admin-panel.git
2. ติดตั้ง package ที่จำเป็น
    ```bash
    cd next_js_recommendation
    npm install
3. ติดตั้ง python package
    ```bash
    cd fastapi
    pip install requirements.txt
    cd ..


<!-- You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details. -->

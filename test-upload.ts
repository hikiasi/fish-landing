import fs from "fs/promises"
import path from "path"

async function testUploadLogic() {
  const uploadDir = path.join(process.cwd(), "public/uploads")
  try {
    await fs.access(uploadDir)
    console.log("Upload directory exists")
  } catch {
    await fs.mkdir(uploadDir, { recursive: true })
    console.log("Created upload directory")
  }
}

testUploadLogic()

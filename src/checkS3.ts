import AWS from 'aws-sdk';
import express, {Request,Response} from 'express';
// Configure AWS with your S3 credentials
AWS.config.update({
  accessKeyId: '',
  secretAccessKey: '',
  region: 'us-east-2',
});
 

// Create an S3 instance
const s3 = new AWS.S3();

// Specify the S3 bucket and object key (file path)
const bucketName = 'songy-bucket';
const objectKey = 's3://songy-bucket/life_goes_on.mp3';

// Create a read stream to download the file
const fileStream = s3.getObject({ Bucket: bucketName, Key: objectKey }).createReadStream();

// Example: Stream the file to the response (Express.js example)
const app = express();

app.get('/download', (req:Request, res:Response) => {
  res.setHeader('Content-Type', 'audio/mpeg'); // Set the appropriate content type for MP3
  res.setHeader('Content-Disposition', 'attachment; filename="your-file.mp3"'); // Optional: Set the filename

  fileStream.pipe(res);
});

const PORT = 4001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: shopping
-- ------------------------------------------------------
-- Server version	8.0.19

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `category_id` bigint NOT NULL,
  `price` int NOT NULL,
  `picture` varchar(450) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`),
  KEY `category_idx` (`category_id`),
  CONSTRAINT `category` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'cola',1,3,'ddfdbfe6-58ff-4f32-881c-93bc756e04bc.jfif'),(2,'sprite',1,3,'bcf10143-92bb-4e7e-83c4-009d2f44e0e2.jpg'),(3,'arak',2,34,'ecd576dd-d00a-4db4-91f3-1a7a6e41bcd1.jpg'),(4,'whisky',2,60,'97e62761-3dbe-48be-99cf-5918896cd644.jpg'),(5,'rice',3,6,'b2425238-147d-40f5-be7a-472bdd1ef36c.jpeg'),(6,'burger',3,10,'0db88f77-eebc-4895-971a-676deade0377.jpg'),(7,'bamba',4,2,'19a294b1-7ba6-437c-b938-556c0def79f2.jpeg'),(8,'bisli',4,2,'41029284-5a84-455e-9404-53554d50394c.png'),(11,'fanta',1,3,'17d94d1a-18a4-4bb4-957f-afaece87d424.jpg'),(12,'rum',2,70,'b9510123-d1e1-499d-9c8b-7dc3b13517c1.jpg'),(26,'Black Coffe',1,7,'9f70e27e-4a59-471b-88f8-f74e4c00a4e5.jpg'),(28,'NesCafe',1,9,'34f56ead-736e-4c93-92b0-48486cf500a5.jpg'),(31,'cola zero',1,3,'f58fcdab-f938-4127-95b0-449406b34350.jpg'),(33,'Fuse Tea',1,3,'50336421-99ef-42b6-928a-f87279f405d9.jpg'),(34,'chocolate',4,3,'9ace65ae-80de-4348-a321-5319b37d8d95.png'),(36,'Hommus',3,4,'f6da243b-8c43-494b-b0d2-d1f42c8c5b38.jpg'),(37,'t\'hini',3,5,'a5c9824c-8c2d-40dc-a975-240eb8f7da39.png'),(39,'bread',3,2,'e75bf3f0-cb0d-4e3a-a185-186770f5779b.png');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-05-25 17:14:18

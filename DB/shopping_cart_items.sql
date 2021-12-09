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
-- Table structure for table `cart_items`
--

DROP TABLE IF EXISTS `cart_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart_items` (
  `product_id` bigint NOT NULL,
  `quantity` bigint NOT NULL,
  `total_price` int NOT NULL,
  `cart_id` bigint NOT NULL,
  KEY `shopping_cart_id_idx` (`cart_id`),
  KEY `product_in_cart_id` (`product_id`),
  CONSTRAINT `product_in_cart_id` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  CONSTRAINT `shopping_cart_id` FOREIGN KEY (`cart_id`) REFERENCES `shopping_cart` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_items`
--

LOCK TABLES `cart_items` WRITE;
/*!40000 ALTER TABLE `cart_items` DISABLE KEYS */;
INSERT INTO `cart_items` VALUES (2,1,7,55),(3,1,50,56),(1,2,14,57),(1,2,14,58),(2,1,7,58),(1,1,7,69),(2,1,7,69),(2,1,7,70),(1,6,42,71),(2,1,7,71),(1,1,5,70),(4,1,80,70),(1,5,25,72),(2,5,25,72),(3,2,76,72),(4,3,240,72),(2,1,5,74),(3,1,38,74),(4,1,80,74),(4,1,80,77),(7,1,3,77),(12,5,70,77),(1,1,5,88),(2,6,30,91),(1,1,5,91),(4,6,480,92),(3,1,38,88),(1,1,5,93),(3,1,38,93),(3,1,38,91),(2,1,5,99),(3,1,38,99),(4,1,80,99),(1,1,5,101),(2,1,5,102),(2,3,15,127),(3,1,38,127),(4,1,80,127),(1,1,5,143),(1,2,10,146),(2,7,35,147),(2,1,5,149),(1,4,20,147),(1,1,5,150),(2,2,10,150),(1,5,25,151),(7,3,9,151),(5,5,50,151),(12,3,210,151),(5,1,10,152),(12,1,70,152),(4,4,320,152),(3,1,38,156),(2,7,35,158),(1,1,5,158),(1,2,10,160),(1,1,5,162),(2,1,5,156),(7,1,3,178),(5,2,20,178),(3,1,38,181),(3,1,38,178),(2,1,5,178),(39,1,1,181),(6,1,20,181),(7,1,3,181),(2,1,5,160),(4,1,80,182),(3,1,38,182),(1,2,10,183),(3,1,38,183),(5,1,10,158),(4,1,80,158),(3,1,38,189),(5,1,10,196),(1,2,6,196),(2,1,5,196),(3,2,68,196),(1,1,5,221),(7,4,12,221),(33,1,5,221),(4,1,80,224),(1,1,5,224),(2,1,5,234),(3,1,38,234),(7,1,2,196),(3,1,34,240),(2,6,18,240),(1,2,6,240),(4,1,60,240),(3,1,34,265),(7,1,2,295),(8,1,2,319),(1,1,3,327),(2,1,3,327),(3,1,34,327),(4,1,60,361),(3,1,34,382);
/*!40000 ALTER TABLE `cart_items` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-05-25 17:14:19

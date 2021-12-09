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
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `city` varchar(45) DEFAULT NULL,
  `street` varchar(45) DEFAULT NULL,
  `user_type` varchar(45) NOT NULL DEFAULT 'CUSTOMER',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'tomer','schwartz','kap70tomer@gmail.com','123456','Shoham','Mizpe 34','ADMIN'),(3,'yossi','schwartz','kap70yossi@gmail.com','000000','TEL-AVIV','mizpe 12','CUSTOMER'),(4,'Yakovson','Senitro','kapSenitro@gmail.com','123333','Ramat gun','Herzel','CUSTOMER'),(11,'Jonathan','Sasson','saso@walla.com','333222','Jerusalem','Giv\'a Zarfatit','CUSTOMER'),(13,'Wwww','Romas','www@www.sss','123321','PETAH-TIKVA','herzal 12','CUSTOMER'),(14,'Qqq','Afldmlfm','Qqq@WWW.www','123123','RISHON-LEZION','hahahaha12','CUSTOMER'),(15,'Slomo','Malka','malka1@gmail.com','123123','JARUSALEM','Argaz 30','CUSTOMER'),(16,'Two','SSS','two@s.cap','123123','PETAH-TIKVA','ls sclcm','CUSTOMER'),(17,'Erik','Cas','saba@sss','112233','TEL-AVIV','cmkama','CUSTOMER'),(18,'tomas','sodu','kap70@gmail.com','e10adc3949ba59abbe56e057f20f883e','RISHON-LEZION','baba 34','CUSTOMER'),(19,'Salvador','Dalhi','kap70dalhi@gmail.com','4297f44b13955235245b2497399d7a93','HIFA','moshava 4','CUSTOMER'),(20,'Casamui','Koko','koko@gmail.com','c2a20efa5e0432594b5a57167472df88','RISHON-LEZION','rosh123','ADMIN'),(21,'Yonat','Goooo','Halabi66@walla.com','c2a20efa5e0432594b5a57167472df88','BEER-SHEVA','Tipo44','CUSTOMER'),(22,'Slomit','DaDon','Haza22@gmail.com','c2a20efa5e0432594b5a57167472df88','TEL-AVIV','rotshild2','CUSTOMER'),(24,'Tomer','Schwartz','salamtak1@gmail.com','c2a20efa5e0432594b5a57167472df88','RISHON-LEZION','sumsum 3','CUSTOMER');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
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

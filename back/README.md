# RESTful webservice

## Install MySQL server

1. Download and install server mysql server version 5.7.20 and newer <https://dev.mysql.com/downloads/mysql/>
   when installing the server, the insole will ask for the password for the root user
   
2. Open console and entered code _mysql_ _-u_ _root_ _-p_ < _schema_crossfitDB.sql_
   entered password for root user
   
3. Chec the database _mysql_ _-u_ _admin_ _-p_ _crossfitDB.sql_
   password: admin
   
   You mast see: 
____________________________________________________________________________________
  Reading table information for completion of table and column names
  You can turn off this feature to get a quicker startup with -A
  Welcome to the MySQL monitor.  Commands end with ; or \g.
  Your MySQL connection id is 32
  Server version: 5.7.20-0ubuntu0.16.04.1 (Ubuntu)
  Copyright (c) 2000, 2017, Oracle and/or its affiliates. All rights reserved.
  Oracle is a registered trademark of Oracle Corporation and/or its
  affiliates. Other names may be trademarks of their respective
  owners.
  Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.
____________________________________________________________________________________

## Install JDK

1. Download and install [JDK-1.8](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)
   help for install for windows <https://docs.oracle.com/javase/8/docs/technotes/guides/install/windows_jdk_install.html>
      
2. Set system path windows <https://java.com/en/download/help/path.xml>

## Install glassfish (and install mysql connector java)

1. Download and install [GlassFish 5.0 - Full Platform](https://javaee.github.io/glassfish/download)

2. Extract Glassfish to a folder on your hard  (for exemple C:\programmfiles\glassfish-5)

3. Download [mysql connector java 5.1.45](https://dev.mysql.com/downloads/connector/j/5.1.html)
   
4. Extract Glassfish to a folder on your hard and copy file C:\temp\mysql-connector-java-5.1.45\mysql-connector-java-5.1.45-     bin.jar    into   C:\programmfiles\glassfish-5\glassfish\domains\domain1\lib

5. If you do not set system path jdk, do next step: open the file for editing C:\programmfiles\glassfish-5\glassfish\config\asenv.bat  and paste configuration -  set path=<Java_Location>/bin    (for exemple - set path=C:\programmfiles\Java\jdk1.8.150\bin)

## Run web service

1. Open cmd and go to glassfish\bin (for exemple - cd C:\programmfiles\glassfish-5\bin)

2. Entered _asadmin_ _start_-_domain_ _domain1_

3. Deploy project : _asadim_-_deploy_ _crossfit-0.01.war_

4. Open web browser and entered url: <http://localhost:8080/crossfit-0.01/>
   You mast see: Hello world!
   on this web service will return a list of JSON from the database <http://localhost:8080/crossfit-0.01/webservice/results/>

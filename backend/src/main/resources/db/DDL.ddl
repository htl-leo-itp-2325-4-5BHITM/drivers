-- Generiert von Oracle SQL Developer Data Modeler 22.2.0.165.1149
--   am/um:        2023-12-12 11:47:22 MEZ
--   Site:      Oracle Database 11g
--   Typ:      Oracle Database 11g



-- predefined type, no DDL - MDSYS.SDO_GEOMETRY

-- predefined type, no DDL - XMLTYPE

CREATE TABLE driver (
    firstname     VARCHAR2(4000),
    lastname      VARCHAR2(4000),
    phone_number  VARCHAR2(4000),
    emai_addressl VARCHAR2(4000),
    ride_id       NUMBER,
    driver_id     NUMBER NOT NULL
);

ALTER TABLE driver ADD CONSTRAINT driver_pk PRIMARY KEY ( driver_id );

CREATE TABLE ride (
    departuretime    TIMESTAMP WITH LOCAL TIME ZONE,
    availableseats   NUMBER(2),
    placeofarrival   VARCHAR2(4000),
    placeofdeparture VARCHAR2(4000),
    driver_id        NUMBER,
    ride_id          NUMBER NOT NULL,
    driver_driver_id NUMBER NOT NULL
);

ALTER TABLE ride ADD CONSTRAINT ride_pk PRIMARY KEY ( ride_id );

ALTER TABLE ride
    ADD CONSTRAINT ride_driver_fk FOREIGN KEY ( driver_driver_id )
        REFERENCES driver ( driver_id );

CREATE SEQUENCE driver_driver_id_seq START WITH 1 NOCACHE ORDER;

CREATE OR REPLACE TRIGGER driver_driver_id_trg BEFORE
    INSERT ON driver
    FOR EACH ROW
    WHEN ( new.driver_id IS NULL )
BEGIN
    :new.driver_id := driver_driver_id_seq.nextval;
END;
/

CREATE SEQUENCE ride_ride_id_seq START WITH 1 NOCACHE ORDER;

CREATE OR REPLACE TRIGGER ride_ride_id_trg BEFORE
    INSERT ON ride
    FOR EACH ROW
    WHEN ( new.ride_id IS NULL )
BEGIN
    :new.ride_id := ride_ride_id_seq.nextval;
END;
/



-- Zusammenfassungsbericht für Oracle SQL Developer Data Modeler: 
-- 
-- CREATE TABLE                             2
-- CREATE INDEX                             0
-- ALTER TABLE                              3
-- CREATE VIEW                              0
-- ALTER VIEW                               0
-- CREATE PACKAGE                           0
-- CREATE PACKAGE BODY                      0
-- CREATE PROCEDURE                         0
-- CREATE FUNCTION                          0
-- CREATE TRIGGER                           2
-- ALTER TRIGGER                            0
-- CREATE COLLECTION TYPE                   0
-- CREATE STRUCTURED TYPE                   0
-- CREATE STRUCTURED TYPE BODY              0
-- CREATE CLUSTER                           0
-- CREATE CONTEXT                           0
-- CREATE DATABASE                          0
-- CREATE DIMENSION                         0
-- CREATE DIRECTORY                         0
-- CREATE DISK GROUP                        0
-- CREATE ROLE                              0
-- CREATE ROLLBACK SEGMENT                  0
-- CREATE SEQUENCE                          2
-- CREATE MATERIALIZED VIEW                 0
-- CREATE MATERIALIZED VIEW LOG             0
-- CREATE SYNONYM                           0
-- CREATE TABLESPACE                        0
-- CREATE USER                              0
-- 
-- DROP TABLESPACE                          0
-- DROP DATABASE                            0
-- 
-- REDACTION POLICY                         0
-- 
-- ORDS DROP SCHEMA                         0
-- ORDS ENABLE SCHEMA                       0
-- ORDS ENABLE OBJECT                       0
-- 
-- ERRORS                                   0
-- WARNINGS                                 0

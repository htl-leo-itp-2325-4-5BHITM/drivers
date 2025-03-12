
INSERT INTO public.ride (departuretime, id, driver, placeofdeparture, availableSeats, placeOfArrival, placeofdeparturecoordinates, placeofarrivalcoordinates) VALUES
      ('2025-03-18 06:30:00', nextval('ride_id_seq'::regclass), 'natalie', 'Leonding', 2, 'Thening', '49.021056,11.270480', '48.259003,14.164950'),
      ('2025-03-18 17:00:00', nextval('ride_id_seq'::regclass), 'janine', 'Hinterstoder', 2, 'Thening', '47.693900,14.158900', '48.259003,14.164950'),
      ('2025-03-17 17:00:00', nextval('ride_id_seq'::regclass), 'andrei', 'NMS Marchtrenk', 4, 'Linz', '48.184800,14.067800', '48.306900,14.285800'),
      ('2024-04-18 06:00:00', nextval('ride_id_seq'::regclass), 'natalie', 'Wien', 1, 'Thening', '48.208200,16.373800', '48.259003,14.164950'),
      ('2025-05-11 17:00:00', nextval('ride_id_seq'::regclass), 'natalie', 'Walding', 4, 'Traun', '48.351521,14.158076', '48.226176,14.240679'),
      ('2025-03-20 21:00:00', nextval('ride_id_seq'::regclass), 'andrei', 'Wels', 3, 'Grieskirchen', '48.161500,14.027500', '48.233300,13.826100'),
      ('2023-03-25 18:30:00', nextval('ride_id_seq'::regclass), 'janine', 'Timelkam', 4, 'Attnang', '48.007900,13.620300', '48.000700,13.718000'),
      ('2023-03-25 18:30:00', nextval('ride_id_seq'::regclass), 'janine', 'Timelkam', 4, 'Regau', '48.007900,13.620300', '48.000700,13.718000'),
      ('2024-04-07 11:30:00', nextval('ride_id_seq'::regclass), 'romana', 'Vöcklabruck', 4, 'Walding', '48.012291,13.642891', '48.351521,14.158076'),
      ('2025-07-19 16:30:00', nextval('ride_id_seq'::regclass), 'natalie', 'Graz', 1, 'Thening', '47.070700,15.439500', '48.259003,14.164950'),
      ('2025-04-18 17:00:00', nextval('ride_id_seq'::regclass), 'andrei', 'München', 2, 'Thening', '48.135100,11.582000', '48.259003,14.164950'),
      ('2025-07-31 10:00:00', nextval('ride_id_seq'::regclass), 'andrei', 'Leonding', 4, 'Neumarkt', '48.270500,14.242800', '48.194722,14.205833'),
      ('2023-05-05 08:30:00', nextval('ride_id_seq'::regclass), 'andrei', 'Wels', 2, 'Regau', '48.015600,13.648100', '48.009100,13.650300'),
      ('2023-05-05 08:30:00', nextval('ride_id_seq'::regclass), 'andrei', 'Steyr', 2, 'Rohrbach', '48.015600,13.648100', '48.009100,13.650300'),
      ('2023-02-05 08:30:00', nextval('ride_id_seq'::regclass), 'natalie', 'Freistadt', 2, 'Gmunden', '48.015600,13.648100', '48.009100,13.650300'),
      ('2025-04-04 08:30:00', nextval('ride_id_seq'::regclass), 'janine', 'Ungenach', 2, 'Vöcklabruck', '48.015600,13.648100', '48.009100,13.650300'),
      ('2025-03-26 14:50:00', nextval('ride_id_seq'::regclass), 'romana', 'Puchenau', 3, 'Walding', '48.312500,14.255000', '48.351521,14.158076');

INSERT INTO public.ride (departuretime, id, driver, placeofdeparture, availableSeats, placeOfArrival, placeofdeparturecoordinates, placeofarrivalcoordinates) VALUES
                    ('2025-04-01 08:00:00', nextval('ride_id_seq'::regclass), 'natalie', 'Neukirchen', 3, 'Neumarkt', '47.251607,12.2762162', '49.279624,11.4594662'),
                    ('2025-04-01 08:00:00', nextval('ride_id_seq'::regclass), 'markus', 'Linz', 3, 'Wels', '48.306900,14.285800', '48.161500,14.027500'),
                    ('2025-04-02 15:30:00',nextval('ride_id_seq'::regclass), 'katrin', 'Traun', 2, 'Leonding', '48.226176,14.240679', '48.270500,14.242800'),
                    ('2025-03-20 09:45:00', nextval('ride_id_seq'::regclass), 'max', 'Leonding', 4, 'Graz', '48.270500,14.242800', '47.070700,15.439500'),
                    ('2025-04-12 17:10:00', nextval('ride_id_seq'::regclass), 'sandra', 'Linz', 2, 'Wien', '48.306900,14.285800', '48.208200,16.373800'),
                    ('2024-06-05 08:30:00', nextval('ride_id_seq'::regclass), 'markus', 'Thening', 1, 'München', '48.259003,14.164950', '48.135100,11.582000'),
                    ('2022-03-23 14:00:00', nextval('ride_id_seq'::regclass), 'katrin', 'Vöcklabruck', 3, 'Salzburg', '48.012291,13.642891', '47.809500,13.055000'),
                    ('2023-05-01 10:30:00', nextval('ride_id_seq'::regclass), 'max', 'Graz', 2, 'Salzburg', '47.070700,15.439500', '47.809500,13.055000'),
                    ('2022-05-17 09:00:00', nextval('ride_id_seq'::regclass), 'sandra', 'Thening', 2, 'Linz', '48.259003,14.164950', '48.306900,14.285800');


INSERT INTO public.drivuser (img,ratingcount,stars,password,id, firstname, lastname, phonenr, emailaddress, username) VALUES
    (1,3,4,'natalie1234',nextval('drivuser_id_seq'::regclass), 'Natalie', 'Schmitzberger', '068110286282', 'n.schmitzberger@students.htl-leonding.ac.at', 'natalie'),
    (3,6,4,'romana1234',nextval('drivuser_id_seq'::regclass), 'Romana', 'Schned', '06608199353', 'r.schned@students.htl-leonding.ac.at', 'romana'),
    (2,10,4,'andrei1234',nextval('drivuser_id_seq'::regclass), 'Andrei', 'Brehar', '06601184680', 'a.brehar@students.htl-leonding.ac.at', 'andrei'),
    (5,3,4,'janine1234',nextval('drivuser_id_seq'::regclass), 'Janine', 'Wenninger', '068181735180', 'j.wenninger@students.htl-leonding.ac.at', 'janine');

INSERT INTO public.drivuser (password,id, firstname, lastname, phonenr, emailaddress, username) VALUES
                                                                                                    ('markus1234',nextval('drivuser_id_seq'::regclass), 'Markus', 'Hofer', '068181735184', 'm.hofer@students.htl-leonding.ac.at', 'markus'),
                                                                                                    ('katrin1234',nextval('drivuser_id_seq'::regclass), 'Katrin', 'Schmidt', '068181735185', 'k.schmidt@students.htl-leonding.ac.at', 'katrin'),
                                                                                                    ('max1234',nextval('drivuser_id_seq'::regclass), 'Max', 'Müller', '068181735186', 'm.mueller@students.htl-leonding.ac.at', 'max'),
                                                                                                    ('sandra1234',nextval('drivuser_id_seq'::regclass), 'Sandra', 'Kraus', '068181735187', 's.kraus@students.htl-leonding.ac.at', 'sandra');
insert into rideregister (rideid, username) VALUES (7,'romana');
insert into rideregister (rideid, username) VALUES (13,'romana');
insert into rideregister (rideid, username) VALUES (20,'romana');
insert into rideregister (rideid, username) VALUES (23,'romana');
insert into rideregister (rideid, username) VALUES (24,'romana');
insert into rideregister (rideid, username) VALUES (9,'andrei');
insert into rideregister (rideid, username) VALUES (17,'andrei');


INSERT INTO public.rate (id,rideid,stars,username) VALUES
    (nextval('drivuser_id_seq'::regclass),7,3,'romana'),
    (nextval('drivuser_id_seq'::regclass),7,2,'romana'),
    (nextval('drivuser_id_seq'::regclass),7,3,'romana'),
    (nextval('drivuser_id_seq'::regclass),7,5,'romana');


/*INSERT INTO public.rideuserassociation (isdriver, rideid, userid) VALUES
    (true, 1, 1),
    (true, 2, 5),
    (true, 3, 3),
    (true, 4, 4),
    (true, 5, 2),
    (true, 6, 1),
    (true, 7, 1),
    (true, 8, 3),
    (true, 9, 4),
    (true, 10, 2),
    (true, 11, 1),
    (true, 12, 5),
    (true, 13, 3),
    (true, 14, 4),
    (true, 15, 2);*/

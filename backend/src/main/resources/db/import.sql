
INSERT INTO public.ride (departuretime, id, driver, placeofdeparture, availableSeats, placeOfArrival, placeofdeparturecoordinates, placeofarrivalcoordinates) VALUES
      ('2025-03-18 06:30:00', nextval('ride_id_seq'::regclass), 'natalie', 'Leonding', 2, 'Thening', '49.021056,11.270480', '48.259003,14.164950'),
      ('2025-03-18 17:00:00', nextval('ride_id_seq'::regclass), 'janine', 'Hinterstoder', 2, 'Thening', '47.693900,14.158900', '48.259003,14.164950'),
      ('2025-03-17 17:00:00', nextval('ride_id_seq'::regclass), 'andrei', 'NMS Marchtrenk', 4, 'Linz', '48.184800,14.067800', '48.306900,14.285800'),
      ('2024-04-18 06:00:00', nextval('ride_id_seq'::regclass), 'natalie', 'Wien', 1, 'Thening', '48.208200,16.373800', '48.259003,14.164950'),
      ('2025-05-11 17:00:00', nextval('ride_id_seq'::regclass), 'natalie', 'Walding', 4, 'Traun', '48.351521,14.158076', '48.226176,14.240679'),
      ('2025-03-20 21:00:00', nextval('ride_id_seq'::regclass), 'andrei', 'Wels', 3, 'Grieskirchen', '48.161500,14.027500', '48.233300,13.826100'),
      ('2023-03-25 18:30:00', nextval('ride_id_seq'::regclass), 'janine', 'Timelkam', 4, 'Attnang', '48.007900,13.620300', '48.000700,13.718000'),
      ('2024-04-07 11:30:00', nextval('ride_id_seq'::regclass), 'romana', 'Vöcklabruck', 4, 'Walding', '48.012291,13.642891', '48.351521,14.158076'),
      ('2025-07-19 16:30:00', nextval('ride_id_seq'::regclass), 'natalie', 'Graz', 1, 'Thening', '47.070700,15.439500', '48.259003,14.164950'),
      ('2025-04-18 17:00:00', nextval('ride_id_seq'::regclass), 'andrei', 'München', 2, 'Thening', '48.135100,11.582000', '48.259003,14.164950'),
      ('2025-07-31 10:00:00', nextval('ride_id_seq'::regclass), 'andrei', 'Leonding', 4, 'Neumarkt', '48.270500,14.242800', '48.194722,14.205833'),
      ('2025-05-05 08:30:00', nextval('ride_id_seq'::regclass), 'janine', 'Ungenach', 2, 'Regau', '48.015600,13.648100', '48.009100,13.650300'),
      ('2025-03-26 14:50:00', nextval('ride_id_seq'::regclass), 'romana', 'Puchenau', 3, 'Walding', '48.312500,14.255000', '48.351521,14.158076');



INSERT INTO public.drivuser (password,id, firstname, lastname, phonenr, emailaddress, username) VALUES
    ('natalie1234',nextval('drivuser_id_seq'::regclass), 'Natalie', 'Schmitzberger', '068181735181', 'n.schmitzberger@students.htl-leonding.ac.at', 'natalie'),
    ('romana1234',nextval('drivuser_id_seq'::regclass), 'Romana', 'Schned', '068181735182', 'r.schned@students.htl-leonding.ac.at', 'romana'),
    ('andrei1234',nextval('drivuser_id_seq'::regclass), 'Andrei', 'Brehar', '068181735183', 'a.brehar@students.htl-leonding.ac.at', 'andrei'),
    ('janine1234',nextval('drivuser_id_seq'::regclass), 'Janine', 'Wenninger', '068181735180', 'j.wenninger@students.htl-leonding.ac.at', 'janine');


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

INSERT INTO public.ride (departuretime, id, driver, placeofdeparture, availableSeats, placeOfArrival) VALUES
    ('2023-11-18 06:30:00', nextval('ride_id_seq'::regclass), 'Natalie Schmitzberger', 'Limesstrasse Parkplatz Schule',2,'Thening'),
    ('2023-11-18 17:00:00', nextval('ride_id_seq'::regclass), 'Robert Schmitzberger', 'Hinterstoder Parkplatz',2,'Thening'),
    ('2023-11-17 17:00:00', nextval('ride_id_seq'::regclass), 'Andrei Brehar', 'NMS Marchtrenk',4,'Linz'),
    ('2023-11-17 11:30:00', nextval('ride_id_seq'::regclass), 'Janine Wenninger', 'Vöcklabruck',1,'Traun'),
    ('2023-11-17 14:30:00', nextval('ride_id_seq'::regclass), 'Romana Schned', 'Walding',3,'Ottensheim'),
    ('2024-01-18 06:00:00', nextval('ride_id_seq'::regclass), 'Natalie Schmitzberger', 'Wien',1,'Thening'),
    ('2024-01-11 17:00:00', nextval('ride_id_seq'::regclass), 'Natalie Schmitzberger', 'Walding',4,'Traun'),
    ('2024-01-20 21:00:00', nextval('ride_id_seq'::regclass), 'Andrei Brehar', 'Wels',3,'Grieskirchen'),
    ('2023-12-25 18:30:00', nextval('ride_id_seq'::regclass), 'Janine Wenninger', 'Timelkam',4,'Attnang'),
    ('2024-01-07 11:30:00', nextval('ride_id_seq'::regclass), 'Romana Schned', 'Vöcklabruck',4,'Walding'),
    ('2024-01-19 16:30:00', nextval('ride_id_seq'::regclass), 'Natalie Schmitzberger', 'Graz',1,'Thening'),
    ('2024-01-18 17:00:00', nextval('ride_id_seq'::regclass), 'Robert Schmitzberger', 'München',2,'Thening'),
    ('2024-01-31 10:00:00', nextval('ride_id_seq'::regclass), 'Andrei Brehar', 'Leonding',4,'Neumarkt'),
    ('2024-01-05 08:30:00', nextval('ride_id_seq'::regclass), 'Janine Wenninger', 'Ungenach',2,'Regau'),
    ('2024-01-26 14:50:00', nextval('ride_id_seq'::regclass), 'Romana Schned', 'Puchenau',3,'Walding');

INSERT INTO public.drivuser (id, firstname, lastname, phonenr, emailaddress) VALUES
    (nextval('drivuser_id_seq'::regclass), 'Natalie', 'Schmitzberger', '068181735181', 'n.schmitzberger@students.htl-leonding.ac.at'),
    (nextval('drivuser_id_seq'::regclass), 'Romana', 'Schned', '068181735182', 'r.schned@students.htl-leonding.ac.at'),
    (nextval('drivuser_id_seq'::regclass), 'Andrei', 'Brehar', '068181735183', 'a.brehar@students.htl-leonding.ac.at'),
    (nextval('drivuser_id_seq'::regclass), 'Janine', 'Wenninger', '068181735180', 'j.wenninger@students.htl-leonding.ac.at'),
    (nextval('drivuser_id_seq'::regclass), 'Robert', 'Schmitzberger', '068181735184', 'rober.schmitzberger@gmx.at');

INSERT INTO public.rideuserassociation (isdriver, rideid, userid) VALUES
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
    (true, 15, 2);
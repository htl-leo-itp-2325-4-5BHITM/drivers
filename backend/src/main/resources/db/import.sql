INSERT INTO public.ride (departuretime, id, driver, placeofdeparture, availableSeats, placeOfArrival) VALUES
    ('2023-11-18 06:30:00', nextval('ride_id_seq'::regclass), 'natalie', 'Limesstrasse Parkplatz Schule',2,'Thening'),
    ('2023-11-18 17:00:00', nextval('ride_id_seq'::regclass), 'robert', 'Hinterstoder Parkplatz',2,'Thening'),
    ('2023-11-17 17:00:00', nextval('ride_id_seq'::regclass), 'andrei', 'NMS Marchtrenk',4,'Linz'),
    ('2024-01-18 06:00:00', nextval('ride_id_seq'::regclass), 'natalie', 'Wien',1,'Thening'),
    ('2024-01-11 17:00:00', nextval('ride_id_seq'::regclass), 'natalie', 'Walding',4,'Traun'),
    ('2024-01-20 21:00:00', nextval('ride_id_seq'::regclass), 'andrei', 'Wels',3,'Grieskirchen'),
    ('2023-12-25 18:30:00', nextval('ride_id_seq'::regclass), 'janine', 'Timelkam',4,'Attnang'),
    ('2024-01-07 11:30:00', nextval('ride_id_seq'::regclass), 'romana', 'Vöcklabruck',4,'Walding'),
    ('2024-01-19 16:30:00', nextval('ride_id_seq'::regclass), 'natalie', 'Graz',1,'Thening'),
    ('2024-01-18 17:00:00', nextval('ride_id_seq'::regclass), 'robert', 'München',2,'Thening'),
    ('2024-01-31 10:00:00', nextval('ride_id_seq'::regclass), 'andrei', 'Leonding',4,'Neumarkt'),
    ('2024-01-05 08:30:00', nextval('ride_id_seq'::regclass), 'janine', 'Ungenach',2,'Regau'),
    ('2024-01-26 14:50:00', nextval('ride_id_seq'::regclass), 'romana', 'Puchenau',3,'Walding');

INSERT INTO public.ride (departuretime, id, driver, placeofdeparture, availableSeats, placeOfArrival, placeofdeparturecoordinates, placeofarrivalcoordinates) VALUES
     ('2023-11-17 11:30:00', nextval('ride_id_seq'::regclass), 'Janine Wenninger', 'Vöcklabruck',1,'Traun','48.012291243336904, 13.64289128193861','48.22617605120782, 14.240679068045338'),
     ('2023-11-17 14:30:00', nextval('ride_id_seq'::regclass), 'Romana Schned', 'Walding',3,'Ottensheim','48.351521431061364, 14.15807648298771','48.33679298027719, 14.175010003575805');


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
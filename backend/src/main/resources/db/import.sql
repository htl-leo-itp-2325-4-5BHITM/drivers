INSERT INTO public.ride (departuretime, id, driver, placeofdeparture, availableSeats, placeOfArrival) VALUES
    ('2023-11-18 06:31:10', nextval('ride_id_seq'::regclass), 'Schmitzberger Natalie', 'Limesstrasse Parkplatz Schule',2,'Thening'),
    ('2023-11-18 17:00:00', nextval('ride_id_seq'::regclass), 'Schmitzberger Robert', 'Hinterstoder Parkplatz',2,'Thening'),
    ('2023-11-17 17:00:00', nextval('ride_id_seq'::regclass), 'Andrei Brehar', 'NMS Marchtrenk',4,'Linz'),
    ('2023-11-17 11:30:00', nextval('ride_id_seq'::regclass), 'Janine Wenninger', 'Vöcklabruck',1,'Traun'),
    ('2023-11-17 14:30:00', nextval('ride_id_seq'::regclass), 'Romana Schned', 'Walding',3,'Ottensheim');

INSERT INTO public.drivuser (id, firstname, lastname, phonenr, emailaddress) VALUES
    (nextval('drivuser_id_seq'::regclass), 'Natalie', 'Schmitzberger', '068181735181', 'n.schmitzberger@students.htl-leonding.ac.at'),
    (nextval('drivuser_id_seq'::regclass), 'Romana', 'Schned', '068181735182', 'r.schned@students.htl-leonding.ac.at'),
    (nextval('drivuser_id_seq'::regclass), 'Andrei', 'Brehar', '068181735183', 'a.brehar@students.htl-leonding.ac.at'),
    (nextval('drivuser_id_seq'::regclass), 'Janine', 'Wenninger', '068181735180', 'j.wenninger@students.htl-leonding.ac.at');
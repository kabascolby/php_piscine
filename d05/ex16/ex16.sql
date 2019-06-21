SELECT count(*) AS 'movies'
    FROM member
    WHERE (date_last_film >= '2006-10-30 00:00:00' AND date_last_film <= '2007-07-27 23:59:59')
    OR DATE_FORMAT(date_last_film, '%m-%d') = '12-24';
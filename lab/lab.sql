-- Q1
SELECT storeid
    , sname
FROM Store
WHERE employee_number<=100 OR city=‘Αθήνα’

-- Q2
SELECT sname
FROM ((
    (SELECT * FROM Goods WHERE gname=’μολύβι’)
    NATURAL JOIN Supply)
    NATURAL JOIN Store
)

-- Q3
SELECT sname
    , city
FROM (
    (SELECT * FROM Supply AS spl
    WHERE NOT EXISTS (
        (SELECT st.gid FROM (
            SELECT gid FROM Supply WHERE storeid=’0808) AS st)
        EXCEPT
        (SELECT spl2.gid FROM Supply AS spl2 WHERE spl2.storeid=spl.storeid)
    )
    NATURAL JOIN Store)
)

-- Q4
SELECT st.sname
FROM (
    SELECT storeid
    FROM Supply
    GROUP BY storeid
    ORDER BY COUNT(gid) DESC
    LIMIT 5)
AS spl, Store AS st
WHERE spl.storeid=st.storeid

-- Q5
SELECT DISTINCT city
FROM Store AS st
    , Goods AS gd
    , Supply AS spl
WHERE gd.gid=spl.gid 
    AND st.storeid=spl.storeid 
    AND gd.price>200

-- Q6
SELECT spl.gid
FROM Supply AS spl
WHERE NOT EXISTS (
    (SELECT st.storeid FROM (
        SELECT storeid FROM Store WHERE city=’Αθήνα’) AS st)
    EXCEPT
    (SELECT spl2.storeid FROM Supply AS spl2 WHERE spl.gid = spl2.gid)
)

-- Q7
SELECT gid
FROM (
    SELECT DISTINCT gid
    FROM Store AS st
        , Supply AS spl
    WHERE st.storeid=spl.storeid AND st.city=’Αθήνα’
)
EXCEPT (
    SELECT DISTINCT gid
    FROM Store AS st
        , Supply AS spl
    WHERE st.storeid=spl.storeid AND st.city=’Πάτρα’
)

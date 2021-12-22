## 게시물 목록 조회 (페이징 네이션)
SELECT BQ.BOARD_ID, BQ.TITLE, COUNT(AW.BOARD_ID) 
FROM BOARD_QA AS BQ 
LEFT JOIN ANSWER AS AW 
ON BQ.BOARD_ID = AW.BOARD_ID 
WHERE 1 GROUP BY BQ.BOARD_ID
LIMIT 0,10 ## LIMIT offset,limit;

## 게시물 목록 조회 (카테고리_ID)
SELECT BQ.BOARD_ID, BQ.TITLE, COUNT(AW.BOARD_ID) 
FROM BOARD_QA AS BQ 
LEFT JOIN ANSWER AS AW 
ON BQ.BOARD_ID = AW.BOARD_ID 
WHERE 1 GROUP BY BQ.BOARD_ID
LIMIT 0,10 ## LIMIT offset,limit;


SELECT BQ.BOARD_ID, BQ.TITLE, COUNT(AW.BOARD_ID) 
    FROM BOARD_QA AS BQ 
    LEFT JOIN ANSWER AS AW 
    ON BQ.BOARD_ID = AW.BOARD_ID 
    WHERE 1 GROUP BY BQ.BOARD_ID
    LIMIT ${offset},10
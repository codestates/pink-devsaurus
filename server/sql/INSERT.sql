## BOARD_QA INSERT
INSERT INTO BOARD_QA VALUES (null,1,1,'test_title','test_content',default,default,null,null);
INSERT INTO BOARD_QA VALUES (null,2,1,'test_title','test_content',default,default,null,null);
INSERT INTO BOARD_QA VALUES (null,3,1,'test_title','test_content',default,default,null,null);
INSERT INTO BOARD_QA VALUES (null,4,1,'test_title','test_content',default,default,null,1);


## User INSERT
INSERT INTO USER VALUES (null,'testUser1@test.com','testUser1','test12!@',default,default);
INSERT INTO USER VALUES (null,'testUser2@test.com','testUser2','test12!@',default,default);
INSERT INTO USER VALUES (null,'testUser3@test.com','testUser3','test12!@',default,default);
INSERT INTO USER VALUES (null,'testUser4@test.com','testUser4','test12!@',default,default);

## Answer INSERT
INSERT INTO ANSWER VALUES (null, 1, 1, 'test_answer_title1', 'test_answer_content1', default, default);
INSERT INTO ANSWER VALUES (null, 1, 2, 'test_answer_title2', 'test_answer_content2', default, default);
INSERT INTO ANSWER VALUES (null, 1, 3, 'test_answer_title3', 'test_answer_content3', default, default);
INSERT INTO ANSWER VALUES (null, 1, 4, 'test_answer_title4', 'test_answer_content4', default, default);

## Category INSERT
INSERT INTO CATEGORY_QA VALUES (null, 'category_1', null);
INSERT INTO CATEGORY_QA VALUES (null, 'category_2', null);
INSERT INTO CATEGORY_QA VALUES (null, 'category_3', null);
INSERT INTO CATEGORY_QA VALUES (null, 'category_4', null);

## Likes_Board INSERT
## 게시물
INSERT LIKES_BOARD VALUES (1,1,null);
INSERT LIKES_BOARD VALUES (2,1,null);
INSERT LIKES_BOARD VALUES (3,1,null);
INSERT LIKES_BOARD VALUES (4,1,null);
## 답변글
INSERT LIKES_BOARD VALUES (1,null,1);
INSERT LIKES_BOARD VALUES (2,null,1);
INSERT LIKES_BOARD VALUES (3,null,1);
INSERT LIKES_BOARD VALUES (4,null,1);
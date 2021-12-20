create database pinkdevsaurus;
use pinkdevsaurus;
## use pinkdevsaurus_test;

create table `USER`(
    `USER_ID` INT(10) NOT NULL AUTO_INCREMENT,
    `EMAIL` VARCHAR(89) NOT NULL UNIQUE COMMENT '유저 이메일' COLLATE 'utf8mb4_unicode_ci',
    `USERNAME` VARCHAR(30) NOT NULL UNIQUE COMMENT '유저 닉네임' COLLATE 'utf8mb4_unicode_ci',
    `PASSWORD` VARCHAR(30) NOT NULL COMMENT '유저 패스워드' COLLATE 'utf8mb4_unicode_ci',
    `CREATED_REG` DATETIME DEFAULT NOW() COMMENT '유저 생성일',
    `PROFILE_IMG` blob COMMENT '프로필 사진데이터',
    PRIMARY KEY (`USER_ID`) USING BTREE
)
COLLATE='utf8mb4_unicode_ci'
ENGINE=InnoDB;


create table `BOARD_QA`(
    `BOARD_ID` INT(10) AUTO_INCREMENT,
    `USER_ID` INT(10) NOT NULL COMMENT '작성자 ID',
    `CATEGORY_ID` VARCHAR(30) NOT NULL COMMENT '카테고리_ID' COLLATE 'utf8mb4_unicode_ci',
    `TITLE` VARCHAR(30) NOT NULL COMMENT '게시판 제목' COLLATE 'utf8mb4_unicode_ci',
    `CONTENT` VARCHAR(1024) NOT NULL COMMENT '게시판 내용' COLLATE 'utf8mb4_unicode_ci',
    `CREATED_DATE` DATETIME DEFAULT NOW() NOT NULL COMMENT '최초 작성일',
    `MODIFY_DATE` DATETIME DEFAULT NOW() NOT NULL COMMENT '수정일', 
	`SELECTED_BREPLY_ID` INT(10) COMMENT '채택된 답변글 ID',
	`SELECTED_USER_ID` INT(10) COMMENT '책택된 유저 ID',
    PRIMARY KEY (`BOARD_ID`) USING BTREE
)
COLLATE='utf8mb4_unicode_ci'
ENGINE=InnoDB;

create table `ANSWER`(
    `ANSWER_ID` INT(10) AUTO_INCREMENT,
	`BOARD_ID` INT(10) NOT NULL COMMENT '게시판_FK',
    `USER_ID` INT(10) NOT NULL COMMENT '작성자_FK',
    `ANSWER_TITLE` VARCHAR(30) NOT NULL COMMENT '답변 제목' COLLATE 'utf8mb4_unicode_ci',
    `ANSWER_CONTENT` VARCHAR(1024) NOT NULL COMMENT '답변 내용' COLLATE 'utf8mb4_unicode_ci',
    `CREATED_DATE` DATETIME DEFAULT NOW() NOT NULL COMMENT '최초 작성일',
    `MODIFY_DATE` DATETIME DEFAULT NOW() NOT NULL COMMENT '수정일', 
    PRIMARY KEY (`ANSWER_ID`) USING BTREE
)
COLLATE='utf8mb4_unicode_ci'
ENGINE=InnoDB;


create table `CATEGORY_QA`(
    `CATEGORY_ID` INT(10) AUTO_INCREMENT,
    `CATEGORY_NAME` VARCHAR(30)	NOT NULL COMMENT '카테고리 이름' COLLATE 'utf8mb4_unicode_ci',
    `CATEGORY_IMG` BLOB COMMENT '카테고리 사진', 
    PRIMARY KEY (`CATEGORY_ID`) USING BTREE
)
COLLATE='utf8mb4_unicode_ci'
ENGINE=InnoDB;


create table `LIKES_BOARD`(
    `USER_ID` INT(10) NOT NULL COMMENT '유저 FK',
    `BOARD_ID` INT(10) COMMENT '게시판 FK',
    `ANSWER_ID` INT(10) COMMENT '답변글 FK'
)
COLLATE='utf8mb4_unicode_ci'
ENGINE=InnoDB;
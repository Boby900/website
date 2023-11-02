## Chapter 26. Backup and Restore

**Table of Contents**

* [26.1. SQL Dump](backup-dump.html)

  * *   [26.1.1. Restoring the Dump](backup-dump.html#BACKUP-DUMP-RESTORE)
    * [26.1.2. Using pg\_dumpall](backup-dump.html#BACKUP-DUMP-ALL)
    * [26.1.3. Handling Large Databases](backup-dump.html#BACKUP-DUMP-LARGE)

  * *   [26.2. File System Level Backup](backup-file.html)
  * [26.3. Continuous Archiving and Point-in-Time Recovery (PITR)](continuous-archiving.html)

    

  * *   [26.3.1. Setting Up WAL Archiving](continuous-archiving.html#BACKUP-ARCHIVING-WAL)
    * [26.3.2. Making a Base Backup](continuous-archiving.html#BACKUP-BASE-BACKUP)
    * [26.3.3. Making a Base Backup Using the Low Level API](continuous-archiving.html#BACKUP-LOWLEVEL-BASE-BACKUP)
    * [26.3.4. Recovering Using a Continuous Archive Backup](continuous-archiving.html#BACKUP-PITR-RECOVERY)
    * [26.3.5. Timelines](continuous-archiving.html#BACKUP-TIMELINES)
    * [26.3.6. Tips and Examples](continuous-archiving.html#BACKUP-TIPS)
    * [26.3.7. Caveats](continuous-archiving.html#CONTINUOUS-ARCHIVING-CAVEATS)

As with everything that contains valuable data, PostgreSQL databases should be backed up regularly. While the procedure is essentially simple, it is important to have a clear understanding of the underlying techniques and assumptions.

There are three fundamentally different approaches to backing up PostgreSQL data:

* SQL dump
* File system level backup
* Continuous archiving

Each has its own strengths and weaknesses; each is discussed in turn in the following sections.
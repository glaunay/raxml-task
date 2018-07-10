# raxml-task

wget https://github.com/stamatak/standard-RAxML/archive/master.zip
unzip master.zip
cd standard-RAxML-master/
make -f Makefile.gcc # basic non-parallized version
make -f Makefile.SSE3.gcc # x86 processor optimized version
make -f Makefile.PTHREADS.gcc # parallelized version
make -f Makefile.SSE3.PTHREADS.gcc # parallelized and x86 processor optimized version


ls raxmlHPC*
 raxmlHPC
 raxmlHPC-PTHREADS
 raxmlHPC-PTHREADS-SSE3
 raxmlHPC-SSE3


# move raxml files to bin/ folder
sudo cp raxmlHPC*   /usr/local/bin/ 

# or, add RAxML path to your .bashrc file
export PATH=$HOME/tools/RAxML/standard-RAxML-master:$PATH

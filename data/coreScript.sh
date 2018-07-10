
raxmlHPC -T 1 -p 1 -m GTRGAMMA --no-bfgs -s $inputF -n NAME > raxml_result.info 2>raxml.err

mv RAxML_bestTree.NAME raxmloutput.nhx

content=$(cat raxmloutput.nhx)

echo "{\"data\" : \"$content\" }"


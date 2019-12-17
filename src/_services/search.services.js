import Api from './Api'

export const searchService = {
  search
};

function search(text) {
  return Api().post('Files/Search',{
    Recursive: true,
    StartFolderId: 1,
    SearchCriteria: [
      {
        SearchMethod: "And",
        Variables: [
          {
            Name: "Number",
            Value: text,
            Operator: "EdmVarOp_StringContains"
          }
        ]
      }
    ]
  })
  .then(result => result.data);
}
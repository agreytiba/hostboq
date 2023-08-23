const asyncHandler = require('express-async-handler')

const Foundation =require("../../models/boqModels/foundationModel")
const Material =require("../../models/materialModel")

// @desc Get all Foundation add
// @route GET /api/foundations
// @access private
const getFoundations =asyncHandler( async(req,res)=>{
  const foundations = await Foundation.find()
    res.status(200).json(foundations)
}
) 



// @desc  create the Foundations
// @route POST /api/foundations
// @access private
const setFoundation = asyncHandler(async (req, res) => {
    // const {mapId} = req.body
    // const foundation = await Foundation.findOne({ mapId: mapId })
    // if (foundation) {
    //     res.json("the foundation boq is existing in our system")
    // }
    console.log(req.body)
    const foundationDetail = await Foundation.create(req.body)
    res.status(200).json(foundationDetail)
}
)
// @desc update Foundation using the map id
// @route PUT /api/foundations/:id
// @access private
const updateFoundation =asyncHandler( async(req,res)=>{
    const foundation = await Foundation.findById(req.params.id)
    if (!foundation) {
         res.status(400)
         throw new Error (' hii ramani haipo')
    }
  
    const updatedFoundation =await Foundation.findByIdAndUpdate(req.params.id, req.body,{new: true,})
    res.status(200).json(updatedFoundation)
})
// @desc  get single   Foundation detail using  id
// @route GET /api/foundations/:id
// @access  private
const getFoundation = asyncHandler( async(req,res)=>{
    const foundation = await Foundation.findById(req.params.id)
    const { materials,mapId,_id,type,userId } = foundation
   
    // check if material contains data
    if (materials.length > 0) {
        const materialsData = []
        // iterate to the materials array object to get Id fetch the data
        for (let i = 0, len=materials.length; i <len ; i++) {
            const { materialId, quantity } = materials[i];
            const {material,rate,unit,manufacturer} = await Material.findById(materialId)
            const info = { material,rate,unit,manufacturer, quantity }
            materialsData.push(info)
        }
    
        res.status(200).json({mapId,type,userId,_id,materialsData})
    }
  
  
})

// @desc  Delete single Foundation detail
// @route DELETE /api/foundations/:id
// @access private
const deleteFoundation = asyncHandler( async(req,res)=>{
    const foundation = await Foundation.findById(req.params.id)

    // check for the Foundation
    if(!foundation){
        res.status(400)
        throw new Error('ramani haipo')
    }

    await Foundation.findOneAndDelete(req.params.id)
    res.status(200).json("Foundation successfully deleted")
})
module.exports ={getFoundations, getFoundation,updateFoundation, setFoundation, deleteFoundation}
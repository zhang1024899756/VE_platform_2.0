/*
 * @Author: zhangxinyu
 * @Date:   2018-03-16 16:39:52
 * @Last Modified by:   zhangxinyu
 * @Last Modified time: 2018-04-11 04:09:39
 */
var express = require('express');
var router = express.Router();

var Attribute = require('../controllers/attribute')
var Component = require('../controllers/component')
var Experiment = require('../controllers/experiment')


router.post('/experiment/new', Experiment.savenew);
router.get('/experiment/list', Experiment.list);
router.get('/component/detail', Experiment.detail);

router.post('/attribute/new', Attribute.savenew);
router.get('/attribute/list', Attribute.list);

router.post('/component/new', Component.savenew);
router.get('/component/list', Component.list);
router.post('/picture/upload', Component.upload);
router.post('/picture/remove', Component.imgcancel);


module.exports = router;
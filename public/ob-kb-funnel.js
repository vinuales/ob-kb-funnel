// Include the angular controller
import 'plugins/ob-kb-funnel/ob-kb-funnel.css';
import 'plugins/ob-kb-funnel/funnelController';
import { TemplateVisTypeProvider } from 'ui/template_vis_type/template_vis_type';
import { VisSchemasProvider } from 'ui/vis/schemas';
import { VisTypesRegistryProvider } from 'ui/registry/vis_types';
import funnelVisTemplate from 'plugins/ob-kb-funnel/ob-kb-funnel.html';
import funnelEditorVisParamsTemplate from 'plugins/ob-kb-funnel/funnelEditor.html';

VisTypesRegistryProvider.register(FunnelProvider);

// The provider function, which must return our new visualization type
function FunnelProvider(Private) {
	console.log("Dentro de FunnelProvider.");
	console.log("TemplateVisType...");
	const TemplateVisType = Private(TemplateVisTypeProvider);
	console.log("Schemas...");
	const Schemas = Private(VisSchemasProvider);
	console.log("return TVT...");
	// Describe our visualization
	return new TemplateVisType({
		name: 'obFunnel', // The internal id of the visualization (must be unique)
		title: 'Funnel View', // The title of the visualization, shown to the user
		description: 'Funnel visualization', // The description of this vis
		icon: 'fa-toggle-down', // The font awesome icon of this visualization
		template: funnelVisTemplate,  // The template, that will be rendered for this visualization
		// Define the aggregation your visualization accepts
		schemas: new Schemas([
				{
					group: 'metrics',
					name: 'tagsize',
					title: 'Value',
					min: 1,
					max: 1,
					aggFilter: ['count', 'avg', 'sum', 'min', 'max', 'cardinality', 'std_dev']
				},
				{
					group: 'buckets',
					name: 'tags',
					title: 'Aggregation',
					min: 1,
					max: 1,
					aggFilter: '!geohash_grid'
				}
			]),
		params: {
			editor: funnelEditorVisParamsTemplate,
			defaults: {
				absolute: true,
      			percent: false,
      			percentFromTop: false,
      			percentFromAbove: false,
      			funnelOptions : "\
{\n\
  \"block\": { \n\
    \"dynamicHeight\": true,\n\
    \"minHeight\": 30,\n\
    \"highlight\": true\n\
  },\n\
  \"chart\": {\n\
    \"curve\": {\n\
      \"enabled\": true\n\
    }\n\
  }\n\
}"
			}
		}
	});
}

export default FunnelProvider;

import moment from 'moment';
import chrome from 'ui/chrome';
import uiModules from 'ui/modules';
import uiRoutes from 'ui/routes';

import 'ui/autoload/styles';
import './less/main.less';
import template from './templates/index.html';

chrome
  .setNavBackground('#222222')
  .setTabs([]);

uiRoutes.enable();
uiRoutes
.when('/', {
  template,
  resolve: {
    currentTime($http) {
      return $http.get('../api/auth_log_visualisation/example').then(function (resp) {
        return resp.data.time;
      });
    }
  }
});

uiModules
.get('app/auth_log_visualisation', [])
.controller('authLogVisualisationHelloWorld', function ($scope, $route, $interval) {
  $scope.title = 'Auth Log Visualisation';
  $scope.description = 'Built in D3.';

  var currentTime = moment($route.current.locals.currentTime);
  $scope.currentTime = currentTime.format('HH:mm:ss');
  var unsubscribe = $interval(function () {
    $scope.currentTime = currentTime.add(1, 'second').format('HH:mm:ss');
  }, 1000);
  $scope.$watch('$destroy', unsubscribe);
});
